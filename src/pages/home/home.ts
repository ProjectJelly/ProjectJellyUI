import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ManagePondsPage } from '../ponds/manage-ponds';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';

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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public weatherServiceProvider: WeatherServiceProvider) {
     
     //this.weatherLocation = this.locationDetails.ParentCity.EnglishName;
  }

  ionViewCanEnter  (){
    this.locationDetails = this.weatherServiceProvider.locationKey
    this.loadHourlyForecast(); 
  }

  ngOnInit(){
    
    console.log("hourlyng:",this.hourlyWeatherStatus);
    
    //this.weatherTemperature = this.hourlyWeatherStatus.Temperature.Metric.Value;
    //this.weatherIcon = this.weatherServiceProvider.getWeatherClassIcon(this.weatherDescription);
  }

  mitigatingActionPopUp(className: string){
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
      this.hourlyWeatherStatus = data;
      console.log("hourly:",this.hourlyWeatherStatus);
      console.log("hourly:",this.hourlyWeatherStatus[0]);
    });
  }

  

}
