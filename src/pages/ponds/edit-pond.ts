import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'edit-pond',
  templateUrl: 'edit-pond.html',
  styleUrls: ['/pages/ponds/modal-ponds.scss']
})
export class EditPond {

  private isCustomizeReading: boolean = false;
  // public isCustomizeThresh: boolean;
  private form: FormGroup;
  private cultureTypeList: any;
  private cultureEnvironmentList: any;
  private hoursList: any;
  private speciesList: any;
  private user: any;
  private site: any;

  constructor(private navParams: NavParams, private view: ViewController, private formBuilder: FormBuilder, public projectJellyService: ProjectJellyServiceProvider, private toast: ToastController) {
    let requestBodyData = navParams.get('data');
    console.log('requestBodyData', requestBodyData);
    this.site = requestBodyData;
    console.log('this.site', this.site);
    this.setForm();
    // console.log('data in edit',navParams.get('data'));
  }
  
  ionViewWillEnter() {
    this.getCultureTypeList();
    this.getCultureEnvtList();
    this.getHoursList();
    this.getSpeciesList();
    this.getUser();
  }

  setForm() {
    this.form = this.formBuilder.group({
      devices: this.formBuilder.array([
      ]),
      siteName: [this.site.siteName, Validators.required],
      location: ['', Validators.required],
      siteSize: [this.site.siteSize, Validators.required],
      waterDepth: [this.site.waterDepth, Validators.required],
      cultureEnvironment: [this.site.cultureEnvironment, Validators.required],
      cultureType: [this.site.cultureType, Validators.required],
      readingInterval: [this.site.readingInterval, Validators.required],
      species: [this.site.species.id, Validators.required]
    });

    for (let i = 0; i < this.site.devices.length; i++) {
      const control = <FormArray>this.form.controls.devices;
      control.push(this.initDeviceFields(this.site.devices[i].deviceNo));
    }
  }

  initDeviceFields(device: any): FormGroup {
    if (!device) {
      device = '';
    }
    return this.formBuilder.group({
      device: [device, Validators.required]
    });
  }

  addNewDeviceField(): void {
    const control = <FormArray>this.form.controls.devices;
    control.push(this.initDeviceFields(null));
  }

  removeDeviceField(i: number): void {
    const control = <FormArray>this.form.controls.devices;
    control.removeAt(i);
  }


  manage(val: any): void {
  }

  closeModal() {
    this.view.dismiss();
  }


  getCultureTypeList() {
    this.projectJellyService.cultureTypeGet()
      .subscribe(data => {
        this.cultureTypeList = data['cultureType'];
      }
      );
  }

  getCultureEnvtList() {
    this.projectJellyService.cultureEnvtGet()
      .subscribe(data => {
        this.cultureEnvironmentList = data['cultureEnv'];
      }
      );
  }

  getHoursList() {
    this.projectJellyService.hoursGet()
      .subscribe(data => {
        this.hoursList = data['hours'];
      }
      );
  }

  getSpeciesList() {
    this.projectJellyService.speciesGet(localStorage.getItem('access_token'))
      .subscribe(data => {
        this.speciesList = data['data'];
      }
      );
  }

  getUser() {
    this.projectJellyService.userGet(localStorage.getItem('access_token'), localStorage.getItem('username'))
      .subscribe(data => {
        this.user = data;
        this.setForm();
      }
      );
  }

  editPond() {
    let siteId: any;
    let requestBody: any = {};
    requestBody = {};
    requestBody.id = this.site.id;
    requestBody.user = {}
    requestBody.user.id = this.user.data.id;
    requestBody.siteName = this.form.value.siteName;
    requestBody.longitude = 7.1231;
    requestBody.latitude = 7.1231;
    requestBody.siteSize = this.form.value.siteSize;
    requestBody.waterDepth = this.form.value.waterDepth;
    requestBody.cultureEnvironment = this.form.value.cultureEnvironment;
    requestBody.cultureType = this.form.value.cultureType;
    requestBody.species = {};
    requestBody.species.id = parseInt(this.form.value.species);
    requestBody.readingInterval = parseInt(this.form.value.readingInterval);
    requestBody.devices = [];

    let serializedForm = JSON.stringify(requestBody);
    this.projectJellyService.showLoading();

    console.log('this.form.value.devices', this.form.value.devices);
    for (let i = 0; i < this.form.value.devices.length; i++) {
      let reqBody: any = {};
      reqBody = {};
      reqBody.deviceNo = this.form.value.devices[i].device;
      reqBody.site = {};
      reqBody.site.id = this.site.id;
      console.log('this.form.value.devices[i].device', this.form.value.devices[i].device);
      let deviceFound: boolean = false;
      for (let j = 0; j < this.site.devices.length; j++) {
        console.log('this.site.device[j].deviceNo', this.site.devices[j].deviceNo);
        if (this.form.value.devices[i].device == this.site.devices[j].deviceNo) {
          console.log('devicc is true');
          deviceFound = true;
          let req: any = {};
          req.id = this.site.devices[j].id;
          req.deviceNo = this.site.devices[j].deviceNo;
          requestBody.devices.push(req);
        }
      }

      if (!deviceFound) {
        console.log('device request', reqBody);
          this.projectJellyService.addDevicePost(localStorage.getItem('access_token'), reqBody)
            .subscribe(data => {
              let newDevice = data['data'];
              console.log('data', newDevice);
              let req: any = {};
              req.id = newDevice.id;
              req.deviceNo = newDevice.deviceNo;
              requestBody.devices.push(req);
            }, (err) => {
              this.presentErrorDeviceToast();
              this.projectJellyService.dismissLoading();
            }
            );
        }
    }

    console.log('requsetBody', requestBody);
    this.projectJellyService.editSitePut(localStorage.getItem('access_token'), requestBody)
      .subscribe(data => {
        var siteResponseData = data['data']
        siteId = siteResponseData['id'];


        this.presentSuccessToast();
        this.closeModal();
        this.projectJellyService.dismissLoading();
      }, (err) => {
        this.presentErrorToast();
        this.projectJellyService.dismissLoading();
      }
      );
  }

  addDevice() {
    let requestBody = new FormData();
    let formObj = this.form.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    this.projectJellyService.addDevicePost(localStorage.getItem('access_token'), serializedForm)
      .subscribe(data => {
        this.presentSuccessToast();
      }, (err) => {
        this.presentErrorToast();
      }
      );
  }

  presentSuccessToast() {
    let toast = this.toast.create({
      message: 'You have edited this pond successfully!',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  presentErrorToast() {
    let toast = this.toast.create({
      message: 'Hmmm. There seems to be something wrong. Please try again.',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  toggleReading() {
    this.isCustomizeReading = !this.isCustomizeReading;
  }

  presentErrorDeviceToast() {
    let toast = this.toast.create({
      message: 'Hmmm. There seems to be something wrong with your device details. Please try again.',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }
}