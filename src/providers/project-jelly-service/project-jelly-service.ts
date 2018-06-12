import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { RequestMethod, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';
/*
  Generated class for the ProjectJellyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectJellyServiceProvider {

  constructor(public http: HttpClient, public appConstants: AppConstantsProvider) {
    console.log('Hello ProjectJellyServiceProvider Provider');
  }

  userGet(token: any) {
    return this.http.get(this.appConstants.getUserAPI)
      .map(res => console.log(res));
  }

  siteGet(token: any) {
    return this.http.get(this.appConstants.getSiteAPI)
      .map(res => console.log(res));
  }

  cultureEnvtGet() {
    return this.http.get(this.appConstants.getCultureEnvironmentAPI)
      .map(res => console.log(res));
  }

  cultureTypeGet() {
    return this.http.get(this.appConstants.getCultureTypeAPI)
      .map(res => console.log(res));
  }

  hoursGet() {
    return this.http.get(this.appConstants.getHoursAPI)
      .map(res => console.log(res));
  }

  speciesGet() {
    return this.http.get(this.appConstants.getSpeciesAPI)
      .map(res => console.log(res));
  }

  readingGet(token: any, username: any) {
    return this.http.get(this.appConstants.getReadingAPI)
      .map(res => console.log(res));
  }

  editUserPut(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .put(this.appConstants.editUserAPI, requestBody, headers)
      .map(res => res);
  }

  editSitePut(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .put(this.appConstants.editSiteAPI, requestBody, headers)
      .map(res => res);
  }

  addUserPost(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .post(this.appConstants.addUserAPI, requestBody, headers)
      .map(res => res);
  }

  addSitePost(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .post(this.appConstants.addUserAPI, requestBody, headers)
      .map(res => res);
  }

  addDevicePost(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .post(this.appConstants.addDeviceAPI, requestBody, headers)
      .map(res => res);
  }

  siteDelete(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .put(this.appConstants.deleteSiteAPI, requestBody, headers)
      .map(res => res);
  }

  deviceDelete(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .put(this.appConstants.deleteDeviceAPI, requestBody, headers)
      .map(res => res);
  }

}



