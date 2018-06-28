import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConstantsProvider {
  locationKeyAPI: any;
  hourlyForecastAPI: any;
  accuweatherAPIKey: any;
  loginAPI:any;
  baseAPI:any;
  getUsersAPI: any;
  getUserAPI: any;
  getSiteAPI: any;
  getSitesAPI: any;
  getCultureEnvironmentAPI: any;
  getCultureTypeAPI: any;
  getHoursAPI: any;
  getSpeciesAPI: any;
  getStreamAPI: any;
  addDeviceAPI: any;
  addSiteAPI: any;
  addUserAPI: any;
  editUserAPI: any;
  editSiteAPI: any;
  deleteDeviceAPI: any;
  deleteSiteAPI: any;
  authorization: any;
  accessToken:any;
  refreshToken:any;
  tokenAPI: any;
  darkSkyAPI: any;
  darkSkyAPIKey:any;
  proxy: any;

  //DATA
  userData: any;
  constructor(public http: HttpClient) {
    this.locationKeyAPI = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
    this.hourlyForecastAPI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.accuweatherAPIKey = '16SLfHQ5l8Sw7iS1YaphhIXqXmjy19CW'
    //this.accuweatherAPIKey = 'Dx1w4JTGShA7hweafeV4L79fIvct0kaG';
    //this.baseAPI = 'https://jelly-ws.azurewebsites.net/';
    
    this.baseAPI = 'http://10.255.188.119:8080/' ;
    this.proxy = 'https://cors-anywhere.herokuapp.com/';
    this.authorization = 'amVsbHlXZWJBcHA6WGh5SFQyM0hjZg=='
    this.tokenAPI = this.baseAPI + 'oauth/token';
    this.getUsersAPI = this.baseAPI + 'api/v1/users';
    this.getUserAPI = this.baseAPI + 'api/v1/users/username/';
    this.getSitesAPI = this.baseAPI + 'api/v1/sites/username/';
    this.getSiteAPI = this.baseAPI + 'api/v1/sites/';
    this.getStreamAPI = this.baseAPI + 'api/v1/sites/stream/';
    this.addDeviceAPI = this.baseAPI + 'api/v1/devices';
    this.addSiteAPI =  this.baseAPI + 'api/v1/sites';
    this.addUserAPI =  this.baseAPI + 'register';
    this.editUserAPI = this.baseAPI + 'api/v1/users';
    this.editSiteAPI =  this.baseAPI + 'api/v1/sites';
    this.deleteDeviceAPI = this.baseAPI + 'api/v1/devices/';
    this.deleteSiteAPI = this.baseAPI + 'api/v1/sites/';
    this.getSpeciesAPI = this.baseAPI + 'api/v1/species';

    //this.baseAPI = 'https://pjelly-ws.azurewebsites.net/' ;
    // this.tokenAPI = this.proxy + this.baseAPI + 'oauth/token';
    // this.getUsersAPI = this.proxy + this.baseAPI + 'api/v1/users';
    // this.getUserAPI = this.proxy + this.baseAPI + 'api/v1/users/username/';
    // this.getSitesAPI = this.proxy + this.baseAPI + 'api/v1/sites/username/';
    // this.getSiteAPI = this.proxy + this.baseAPI + 'api/v1/sites/';
    // this.getStreamAPI = this.proxy + this.baseAPI + 'api/v1/sites/';
    // this.addDeviceAPI = this.proxy + this.baseAPI + 'api/v1/devices';
    // this.addSiteAPI = this.baseAPI + 'api/v1/sites';
    // this.addUserAPI = this.proxy + this.baseAPI + 'register';
    // this.editUserAPI = this.proxy + this.baseAPI + 'api/v1/user/edit-profile';
    // this.editSiteAPI = this.proxy + this.baseAPI + 'api/v1/sites';
    // this.deleteDeviceAPI = this.proxy + this.baseAPI + 'api/v1/devices/';
    // this.deleteSiteAPI = this.proxy + this.baseAPI + 'api/v1/sites';
    // this.getSpeciesAPI = this.proxy + this.baseAPI + 'api/v1/species';

    this.getCultureEnvironmentAPI = '../../assets/mock/getCultureEnvironment.json';
    this.getCultureTypeAPI = '../../assets/mock/getCultureType.json';
    this.getHoursAPI = '../../assets/mock/getHours.json';
    this.refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiamVsbHl3c3Jlc291cmNlIl0sInVzZXJfbmFtZSI6ImphbWVlbGEubC5hLnRvcnJlcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiI5ZDdiYzIxZS1mYTExLTRkY2UtODhkZC01N2I4NTRiYjAzNzAiLCJleHAiOjE1MzE0Njg1NTYsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImp0aSI6IjJjYmZjMjI1LWNlNjUtNDE5MS1hMzQ0LTg3YmMyYjQ0NDhkNSIsImNsaWVudF9pZCI6ImplbGx5V2ViQXBwIn0.GDI0Dti7WwQA595cgpTaxr2sQxuuZmBeRKkJS0DopfA';
    this.accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiamVsbHl3c3Jlc291cmNlIl0sInVzZXJfbmFtZSI6ImphbWVlbGEubC5hLnRvcnJlcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1MjkwMzkwOTIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImp0aSI6IjM2ZTA4OTVmLTI3ZDctNDExYy1hOWI5LTI0OTM0MWYwMmRiYyIsImNsaWVudF9pZCI6ImplbGx5V2ViQXBwIn0.bQJDdWsxhhmB1gY_NIhD1iBCbd0EPParManmeSO_734';
    this.darkSkyAPIKey = 'c672fcc9605c9fffd77b2412f93c399a';
    this.darkSkyAPI = this.proxy + 'https://api.darksky.net/forecast/' + this.darkSkyAPIKey + '/';
  }

  getUserData() {
    return this.userData;
  }

  setUserData(userData: any) {
    this.userData = userData;
  }

}
