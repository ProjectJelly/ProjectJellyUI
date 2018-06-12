import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConstantsProvider {
  locationKeyAPI: any;
  hourlyForecastAPI: any;
  accuweatherAPIKey: any;
  baseAPI:any;
  getUserAPI: any;
  getSiteAPI: any;
  getCultureEnvironmentAPI: any;
  getCultureTypeAPI: any;
  getHoursAPI: any;
  getSpeciesAPI: any;
  getReadingAPI: any;
  addDeviceAPI: any;
  addSiteAPI: any;
  addUserAPI: any;
  editUserAPI: any;
  editSiteAPI: any;
  deleteDeviceAPI: any;
  deleteSiteAPI: any;
  authorization: any;

  //DATA
  userData: any;

  constructor(public http: HttpClient) {
    this.locationKeyAPI = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
    this.hourlyForecastAPI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.accuweatherAPIKey = '16SLfHQ5l8Sw7iS1YaphhIXqXmjy19CW'
    //this.accuweatherAPIKey = 'Dx1w4JTGShA7hweafeV4L79fIvct0kaG';
    this.authorization = 'amVsbHlXZWJBcHA6WGh5SFQyM0hjZg=='
    this.baseAPI = 'http://demo0424663.mockable.io/';
    this.getUserAPI = '../../assets/mock/getUser.json'
    this.getSiteAPI = '../../assets/mock/getSite.json'
    this.getCultureEnvironmentAPI = '../../assets/mock/getCultureEnvironment.json';
    this.getCultureTypeAPI = '../../assets/mock/getCultureType.json';
    this.getHoursAPI = '../../assets/mock/getHours.json';
    this.getSpeciesAPI = '../../assets/mock/getSpecies.json';
    this.getReadingAPI = '';
    this.addDeviceAPI = this.baseAPI + 'api/v1/device';
    this.addSiteAPI = this.baseAPI + 'api/v1/sites';
    this.addUserAPI = this.baseAPI + 'api/v1/users';
    this.editUserAPI = this.baseAPI + 'api/v1/users';
    this.editSiteAPI = this.baseAPI + 'api/v1/sites';
    this.deleteDeviceAPI = this.baseAPI + 'api/v1/device';
    this.deleteSiteAPI = this.baseAPI + 'api/v1/device';

  }

  getUserData() {
    return this.userData;
  }

  setUserData(userData: any) {
    this.userData = userData;
  }

}
