import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    this.apiKey = appConstants.accuweatherAPIKey;
    this.hourlyForecastAPI = appConstants.hourlyForecastAPI;
    this.locationKeyAPI = appConstants.locationKeyAPI;
    this.longitude = '6.2447';
    this.latitude = '124.5528';
    this.locationKey = this.loadLocationKey();
  }

  getCurrentWeather(param: any){
    return this.http.get(this.appConstants.darkSkyAPI + param);
  }

  getLocationKey() {
    if (this.locationKey) {
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

    if(!this.locationKey){
      this.loadLocationKey();
    }
    
    return new Promise(resolve => {
      this.http.get(this.hourlyForecastAPI + this.locationKey.Key + '?apikey=' + this.apiKey).subscribe(data => {
        resolve(data);
        this.hourlyStat = data;
      }, err => {
        console.log(err);
      });
    });
  }


 loadLocationKey(){
    this.getLocationKey()
    .then(data => {
      this.locationKey = data;
    });
  }
  

  getWeatherClassIcon(weather: String){
    var weatherClass: any;
    if(weather == "Sunny" || weather == "Hot" || weather == "Clear"){
      weatherClass = "sunny";
    } else if(weather == "Mostly Sunny" || weather == "Intermittent Clouds" ||  weather == "Mostly Clear") {
      weatherClass = "mostly-sunny";
    } else if(weather == "Partly Sunny") {
      weatherClass = "partly-sunny";
    } else if(weather == "Hazy Sunshine" || weather == "Hazy Moonlight") {
      weatherClass = "hazy";
    } else if(weather == "Mostly Cloudy") {
      weatherClass = "mostly-cloudy";
    } else if(weather == "Partly Cloudy") {
      weatherClass = "partly cloudy";
    } else if(weather == "Cloudy" || weather == "Cold" || weather == "Windy") {
      weatherClass = "cloudy";
    } else if(weather == "Dreary") {
      weatherClass = "overcast";
    } else if(weather == "Fog") {
      weatherClass = "fog";
    } else if(weather == "Showers") {
      weatherClass = "showers";
    } else if(weather == "Mostly Cloudy w/ Showers" || weather == "Partly Cloudy w/ Showers" || weather == "Partly Sunny w/ Showers") {
      weatherClass = "chance-showers";
    } else if(weather == "Mostly Cloudy w/ T-Storms" || weather == "Partly Cloudy w/ T-Storms" || weather == "Partly Sunny w/ T-Storms") {
      weatherClass = "thunderstorm";
    } else if(weather == "Mostly Cloudy w/ Flurries" || weather == "Partly Cloudy w/ Flurries" || weather == "Partly Sunny w/ Flurries"){
      weatherClass = "flurries";
    } else if(weather == "Snow" || weather == "Mostly Cloudy w/ Snow" || weather == "Ice" || weather == "Sleet"){
      weatherClass = "snow";
    } else if(weather == "Freezing Rain" || weather == "Rain"){
      weatherClass = "rain";
    } else if(weather == "Rain and Snow" || weather == "Rain"){
      weatherClass = "rain-snow";
    }
    return weatherClass;
  }
}
