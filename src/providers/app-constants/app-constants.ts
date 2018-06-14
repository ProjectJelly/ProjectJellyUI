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
  accessToken:any;
  refreshToken:any;

  //DATA
  userData: any;
  constructor(public http: HttpClient) {
    this.locationKeyAPI = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
    this.hourlyForecastAPI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.accuweatherAPIKey = '16SLfHQ5l8Sw7iS1YaphhIXqXmjy19CW'
    //this.accuweatherAPIKey = 'Dx1w4JTGShA7hweafeV4L79fIvct0kaG';
    this.authorization = 'amVsbHlXZWJBcHA6WGh5SFQyM0hjZg=='
    this.baseAPI = 'http://localhost:8080/api/v1/';
    //this.baseAPI = 'http://demo0424663.mockable.io/';
    this.getUserAPI = this.baseAPI + 'users/username/'
    this.getSiteAPI = '../../assets/mock/getSite.json'
    this.getCultureEnvironmentAPI = '../../assets/mock/getCultureEnvironment.json';
    this.getCultureTypeAPI = '../../assets/mock/getCultureType.json';
    this.getHoursAPI = '../../assets/mock/getHours.json';
    this.getSpeciesAPI = '../../assets/mock/getSpecies.json';
    this.getReadingAPI = '';
    this.addDeviceAPI = this.baseAPI + 'device';
    this.addSiteAPI = this.baseAPI + 'sites';
    this.addUserAPI = this.baseAPI + 'users';
    this.editUserAPI = this.baseAPI + 'users';
    this.editSiteAPI = this.baseAPI + 'sites';
    this.deleteDeviceAPI = this.baseAPI + 'device';
    this.deleteSiteAPI = this.baseAPI + 'device';
    this.refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiamVsbHl3c3Jlc291cmNlIl0sInVzZXJfbmFtZSI6ImphbWVlbGEubC5hLnRvcnJlcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiI5ZDdiYzIxZS1mYTExLTRkY2UtODhkZC01N2I4NTRiYjAzNzAiLCJleHAiOjE1MzE0Njg1NTYsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImp0aSI6IjJjYmZjMjI1LWNlNjUtNDE5MS1hMzQ0LTg3YmMyYjQ0NDhkNSIsImNsaWVudF9pZCI6ImplbGx5V2ViQXBwIn0.GDI0Dti7WwQA595cgpTaxr2sQxuuZmBeRKkJS0DopfA';
    this.accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiamVsbHl3c3Jlc291cmNlIl0sInVzZXJfbmFtZSI6ImphbWVlbGEubC5hLnRvcnJlcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1MjkwMzkwOTIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImp0aSI6IjM2ZTA4OTVmLTI3ZDctNDExYy1hOWI5LTI0OTM0MWYwMmRiYyIsImNsaWVudF9pZCI6ImplbGx5V2ViQXBwIn0.bQJDdWsxhhmB1gY_NIhD1iBCbd0EPParManmeSO_734';

  }

  getUserData() {
    return this.userData;
  }

  setUserData(userData: any) {
    this.userData = userData;
  }

}
