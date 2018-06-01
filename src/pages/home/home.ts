import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ManagePondsPage } from '../ponds/manage-ponds';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public hourlyWeatherStatus: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public weatherServiceProvider: WeatherServiceProvider) {
   this.loadHourlyForecast();
  }

  mitigatingActionPopUp(className: string){
    console.log("this.hourlyWeatherStatus", this.hourlyWeatherStatus);
    let alert = this.alertCtrl.create({
        title: 'MITIGATING ACTION',
        subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
        buttons: ['Ok'],
        cssClass: className
      });
 
    alert.present();
  }

  loadHourlyForecast(){
    this.weatherServiceProvider.getHourlyForecast()
    .then(data => {
      console.log(data);
    });
  }

}
