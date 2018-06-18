import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ManagePondsPage } from '../ponds/manage-ponds';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public weatherServiceProvider: WeatherServiceProvider, public authServiceProvider: AuthServiceProvider) {
     //this.weatherLocation = this.locationDetails.ParentCity.EnglishName;
  }

  ionViewCanEnter  (){
    
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

  loadHourlyForecast(){
    this.weatherServiceProvider.getHourlyForecast()
    .then(data => {
      this.hourlyWeatherStatus = data;
      console.log("hourly:",this.hourlyWeatherStatus);
      console.log("hourly:",this.hourlyWeatherStatus[0]);
    });
  }

  

}
