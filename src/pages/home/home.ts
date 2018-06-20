import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ManagePondsPage } from '../ponds/manage-ponds';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import { LoginPage } from '../login/login';

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
  private siteList:any;
  private siteId: any;
  private site:any;
  private weather: any;

  constructor(public navCtrl: NavController,  public formBuilder: FormBuilder, public alertCtrl: AlertController, public weatherServiceProvider: WeatherServiceProvider, public authServiceProvider: AuthServiceProvider, public projectJellyService: ProjectJellyServiceProvider) {
     //this.weatherLocation = this.locationDetails.ParentCity.EnglishName;
  }

  ionViewCanEnter  (){
    this.getSite();
    
  }

  mitigatingActionPopUp(className: string){
    let alert = this.alertCtrl.create({
        title: 'MITIGATING ACTION', 
        subTitle: 'You must pump your water to increase the pond oxygen',
        buttons: ['Ok'],
        cssClass: className
      });
 
    alert.present();
  }

  getSite() {
    this.projectJellyService.showLoading();
    this.projectJellyService.siteGet(localStorage.getItem('access_token'), localStorage.getItem('username'))
      .subscribe(data => {
        this.siteList = data['data'];
        this.siteId = this.siteList[0].id;
        this.projectJellyService.dismissLoading();
        this.getSiteById();
      }
      );
  }

  getSiteById() {
    this.projectJellyService.showLoading();
    this.projectJellyService.siteByIdGet(localStorage.getItem('access_token'), this.siteId)
      .subscribe(data => {
        this.site = data['data'];
        this.getWeather();
        this.projectJellyService.dismissLoading();
      }
      );
  }

  getWeather(){
    let param = this.site.latitude + ',' + this.site.longitude
    this.weatherServiceProvider.getCurrentWeather(param)
      .subscribe(data => {
        console.log('weather', data);
        this.weather = data;
      }
      );
  }

  siteFilter() {
    this.getSiteById();
  } 
}
