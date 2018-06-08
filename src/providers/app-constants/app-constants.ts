import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the AppConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppConstantsProvider {
  locationKeyAPI: any;
  hourlyForecastAPI: any;
  accuweatherAPIKey: any;

  constructor(public http: HttpClient) {
    this.locationKeyAPI = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
    this.hourlyForecastAPI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.accuweatherAPIKey = '16SLfHQ5l8Sw7iS1YaphhIXqXmjy19CW'
    //this.accuweatherAPIKey = 'Dx1w4JTGShA7hweafeV4L79fIvct0kaG';
  }

  getLocationKeyAPI(){
    return this.locationKeyAPI;
  }

  getHourlyForecastAPI(){
    return this.hourlyForecastAPI;
  }

  getAccuweatherAPI(){
    return this.accuweatherAPIKey;
  }
}