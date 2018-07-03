import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import { ToastController } from 'ionic-angular';
import { GeocodingServiceProvider } from '../../providers/geocoding-service/geocoding-service';

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
  private deleteDevices: any;

  constructor(private navParams: NavParams, private view: ViewController, private geocoder: GeocodingServiceProvider, private formBuilder: FormBuilder, public projectJellyService: ProjectJellyServiceProvider, private toast: ToastController) {
    let requestBodyData = navParams.get('data');
    console.log('requestBodyData', requestBodyData);
    this.site = requestBodyData;
    console.log('this.site', this.site);
    this.setForm();
    this.deleteDevices = [];
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
      location: [this.site.address, Validators.required],
      siteSize: [this.site.siteSize, Validators.required],
      waterDepth: [this.site.waterDepth, Validators.required],
      cultureEnvironment: [this.site.cultureEnvironment, Validators.required],
      cultureType: [this.site.cultureType, Validators.required],
      readingInterval: [this.site.readingInterval, Validators.required],
      species: [this.site.species.id, Validators.required]
    });

    if (this.site.devicesDto) {
      for (let i = 0; i < this.site.devicesDto.length; i++) {
        const control = <FormArray>this.form.controls.devices;
        control.push(this.initDeviceFields(this.site.devicesDto[i].deviceNo));
      }
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
    console.log('control.value[i].device', control.value[i].device);
    this.deleteDevices.push(control.value[i].device);
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

  deleteDevice(device: any){
    var deviceId: any;
    for(let i = 0; i < this.site.devicesDto.length; i++){
      if(this.site.devicesDto[i].deviceNo == device){
        deviceId = this.site.devicesDto[i].id;
      }
    }
    this.projectJellyService.deviceDelete(localStorage.getItem('access_token'), deviceId)
      .subscribe(data => {

      }, (err) => {
        this.presentErrorToast();
      }
      );
  }

  editPond() {
    let siteId: any;
    let requestBody: any = {};
    requestBody = {};
    requestBody.id = this.site.id;
    requestBody.user = this.user.data.id;
    requestBody.siteName = this.form.value.siteName;
    requestBody.address = this.form.value.location;
    requestBody.siteSize = this.form.value.siteSize;
    requestBody.waterDepth = this.form.value.waterDepth;
    requestBody.cultureEnvironment = this.form.value.cultureEnvironment;
    requestBody.cultureType = this.form.value.cultureType;
    requestBody.species = parseInt(this.form.value.species);
    requestBody.readingInterval = parseInt(this.form.value.readingInterval);
    requestBody.devices = [];

    let serializedForm = JSON.stringify(requestBody);
    this.projectJellyService.showLoading();

    for (let i = 0; i < this.form.value.devices.length; i++) {
      var deviceExist = false;
      for(let j = 0; j < this.site.devicesDto.length; j++){
        if(this.site.devicesDto[j].deviceNo == this.form.value.devices[i].device){
          deviceExist = true;
        }
      }
      if(!deviceExist){
        console.log('device not exist', this.form.value.devices[i].device);
        requestBody.devices.push(this.form.value.devices[i].device);
      }
    }

    this.geocoder.getGeocode(this.form.value.location)
      .subscribe(data => {
        var geocode = JSON.parse(data['_body']);
        requestBody.longitude = geocode.results[0].geometry.location.lng;
        requestBody.latitude = geocode.results[0].geometry.location.lat;
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
      });

      for(let i = 0; i < this.deleteDevices.length; i++){
        console.log('this.deleteDevices[i]', this.deleteDevices[i]);
        this.deleteDevice(this.deleteDevices[i]);
      }
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