import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Modal, ModalController, ModalOptions } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import * as jQuery from 'jquery';

declare var require: any;
const example = require('../../assets/skycons/skycons');

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {
  public hourlyWeatherStatus: any;
  public weatherIcon: any;
  public weatherLocation: any;
  public weatherTemperature: any;
  public weatherDescription: any;
  private locationDetails: any;
  private siteList: any;
  private siteId: any;
  private site: any;
  private stream: any;
  private mitigatingActions: any;
  private readingResults: any;
  private thresholds: any;
  private weather: any;
  private readings:any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, private modal: ModalController, public alertCtrl: AlertController, public weatherServiceProvider: WeatherServiceProvider, public authServiceProvider: AuthServiceProvider, public projectJellyService: ProjectJellyServiceProvider) {
    //this.weatherLocation = this.locationDetails.ParentCity.EnglishName;
  }

  ionViewCanEnter() {
    this.getSite();
  }

  mitigatingActionPopUp(className: string) {
    let alert = this.alertCtrl.create({
      title: 'MITIGATING ACTION',
      subTitle: this.mitigatingActions,
      buttons: ['Ok'],
      cssClass: className
    });

    alert.present();
  }

  getSite() {
    this.projectJellyService.showLoading();
    this.projectJellyService.siteGet(localStorage.getItem('access_token'), localStorage.getItem('username'))
      .subscribe(data => {
        console.log('data', data);
        this.siteList = data['data'];
        if (this.siteList.length > 0) {
          this.siteId = this.siteList[0].id;
          this.getSiteById();

        } else {
          this.projectJellyService.dismissLoading();
        }
      }
      );
  }

  getSiteById() {
    this.projectJellyService.showLoading();
    this.projectJellyService.siteByIdGet(localStorage.getItem('access_token'), this.siteId)
      .subscribe(data => {
        this.site = data['data'];
        console.log('this.site', this.site);
        if (this.site) {
          this.getWeather();
          this.getStream();
        }

        this.projectJellyService.dismissLoading();
      }
      );
  }

  getWeather() {
    let param = this.site.latitude + ',' + this.site.longitude + '?units=si'
    this.weatherServiceProvider.getCurrentWeather(param)
      .subscribe(data => {
        console.log('weather', data);
        this.weather = data;
        this.runSkyCons();
      }
      );
  }

  getStream() {
    this.projectJellyService.streamGet(localStorage.getItem('access_token'), this.siteId)
      .subscribe(data => {
        console.log('stream data', data);
        this.stream = data['data'];
        this.readingResults = this.stream.readingResults[this.stream.readingResults.length - 1];
        this.readings = this.stream.readings;
        console.log('this.readingResults', this.readingResults);
        this.getMitigationActions();
      }
      );
  }

  getMitigationActions() {
    this.mitigatingActions = [];
    for (let reading of this.stream.readingResults) {
      for (let thresh of this.stream.site.species.thresholds) {
        if (thresh.parameterCode == reading.parameterCode) {
          let readingActions: any = {};
          readingActions = {};
          if (reading.status == 2 || reading.status == 3) {
            readingActions.parameterCode = reading.parameterCode;
            readingActions.description = thresh.deadlyLowTreatment.description;
            readingActions.status = reading.status;
            //this.mitigatingActions.push(thresh.deadlyLowTreatment.description);
            this.mitigatingActions.push(readingActions);
          } 
        }
      }
    }
  }

  siteFilter() {
    this.getSiteById();
  }

  openModal(page: any, param: any) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    console.log('param edit', param);
    let requestBody: any = {};
    requestBody = {};
    requestBody = param;
    console.log('requestBody', requestBody);
    const myModal: Modal = this.modal.create(page, { data: requestBody });
    myModal.present();
  }

  runSkyCons() {
    var weather = this.weather.currently.icon ;
    console.log('weather', weather);
    jQuery(function () {
      console.log('skycons', skycons);
      var skycons = new example.Skycons({ "color": "white" },  {"resizeClear": true});
      skycons.remove("icon1");
      skycons.add("icon1", weather);
      skycons.play();
      console.log('skycons', skycons);
    })

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getSiteById();
      refresher.complete();
    }, 1000);
  }


}
