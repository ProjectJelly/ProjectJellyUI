import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';


@Injectable()
export class WeatherServiceProvider {

  public locationKey: any;
  public hourlyStat: any;
  public apiKey: any;
  public hourlyForecastAPI: any;
  public locationKeyAPI: any;
  public longitude: any;
  public latitude: any;

  constructor(public http: HttpClient, public appConstants: AppConstantsProvider) {
    this.apiKey = appConstants.getAccuweatherAPI();
    this.hourlyForecastAPI = appConstants.getHourlyForecastAPI();
    this.locationKeyAPI = appConstants.getLocationKeyAPI();
    this.longitude = '6.2447';
    this.latitude = '124.5528';
    this.locationKey = this.loadLocationKey();
  }

  getLocationKey() {
    if (this.locationKey) {
      // already loaded data
      return Promise.resolve(this.locationKey);
    }
    return new Promise(resolve => {
      this.http.get(this.locationKeyAPI + '?apikey=' + this.apiKey + '&q=' + this.longitude + '%2C' + this.latitude).subscribe(data => {
        resolve(data);
        this.locationKey = data;
      }, err => {
        console.log(err);
      });
    });
  }

  getHourlyForecast() {
    if (this.hourlyStat) {
      // already loaded data
      return Promise.resolve(this.hourlyStat);
    }
    console.log("this.locationKey:", this.locationKey);
    if(!this.locationKey){
      this.loadLocationKey();
    }
    
    return new Promise(resolve => {
      this.http.get(this.hourlyForecastAPI + this.locationKey.Key + '?apikey=' + this.apiKey).subscribe(data => {
        resolve(data);
        this.hourlyStat = data;
        console.log("data", data);
      }, err => {
        console.log(err);
      });
    });
  }


loadHourlyForecast(){
    this.getHourlyForecast()
    .then(data => {
      console.log(data);
    });
  }

 loadLocationKey(){
    this.getLocationKey()
    .then(data => {
      this.locationKey = data;
    });
  }
}
