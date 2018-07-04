import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Platform } from 'ionic-angular';
import { Http, HttpModule } from '@angular/http';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import { ToastController, AlertController } from 'ionic-angular';
import { GeocodingServiceProvider } from '../../providers/geocoding-service/geocoding-service';


/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'add-pond',
  templateUrl: 'add-pond.html'
})
export class AddPond {

  private isCustomizeReading: boolean = false;
  // public isCustomizeThresh: boolean;
  private form: FormGroup;
  private cultureTypeList: any;
  private cultureEnvironmentList: any;
  private hoursList: any;
  private speciesList: any;
  private user: any;

  constructor(private platform: Platform, private alertCtrl: AlertController, private geocoder: GeocodingServiceProvider, public http: Http, private navParams: NavParams, private view: ViewController, private formBuilder: FormBuilder, public projectJellyService: ProjectJellyServiceProvider, private toast: ToastController) {
    this.setForm();

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
      siteName: ['', Validators.required],
      location: ['', Validators.required],
      siteSize: ['', Validators.required],
      waterDepth: ['', Validators.required],
      cultureEnvironment: ['', Validators.required],
      cultureType: ['', Validators.required],
      readingInterval: ['', Validators.required],
      species: ['', Validators.required],
    });
  }

  initDeviceFields(): FormGroup {
    return this.formBuilder.group({
      device: ['', Validators.required]
    });
  }

  addNewDeviceField(): void {
    const control = <FormArray>this.form.controls.devices;
    control.push(this.initDeviceFields());
  }

  removeDeviceField(i: number): void {
    const control = <FormArray>this.form.controls.devices;
    control.removeAt(i);
  }


  manage(val: any): void {
  }

  closeModal() {
    const data = {
      name: 'John Doe',
      occupation: 'Milkman'
    };
    this.view.dismiss(data);
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

  addPond() {

    // if (this.platform.is('cordova')) {
    //   console.log('geocoding service:', this.forwardGeocode(this.form.value.location));
    // }
    let siteId: any;
    let requestBody: any = {};
    requestBody = {};
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

    for (let i = 0; i < this.form.value.devices.length; i++) {
      requestBody.devices.push(this.form.value.devices[i].device);
    }

    this.geocoder.getGeocode(this.form.value.location).subscribe(
      data => {
        var geocode = JSON.parse(data['_body']);
        requestBody.longitude = geocode.results[0].geometry.location.lng;
        requestBody.latitude = geocode.results[0].geometry.location.lat;

        console.log('geocode', JSON.parse(data['_body']));
        console.log('requestBody addpond', requestBody);

        let serializedForm = JSON.stringify(requestBody);
        this.projectJellyService.showLoading();
        this.projectJellyService.addSitePost(localStorage.getItem('access_token'), requestBody)
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
      message: 'You have added a pond successfully!',
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