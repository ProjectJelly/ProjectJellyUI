import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  userGet(token: any, username: string) {
    return this.http.get(this.appConstants.getUserAPI + username, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.appConstants.accessToken,
          'Content-Type': 'application/json'
        })
     });
  }

  siteGet(token: any) {
    return this.http.get(this.appConstants.getSiteAPI, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.appConstants.accessToken,
          'Content-Type': 'application/json'
        })
     });
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
    return this.http.get(this.appConstants.getReadingAPI, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.appConstants.accessToken,
          'Content-Type': 'application/json'
        })
     });
  }

  editUserPut(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .put(this.appConstants.editUserAPI, requestBody, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.appConstants.accessToken,
          'Content-Type': 'application/json'
        })
     });
  }

  editSitePut(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .put(this.appConstants.editSiteAPI, requestBody,  { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.appConstants.accessToken,
          'Content-Type': 'application/json'
        })
     });
  }

  addUserPost(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .post(this.appConstants.addUserAPI, requestBody, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.appConstants.accessToken,
          'Content-Type': 'application/json'
        })
     });
  }

  addSitePost(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .post(this.appConstants.addUserAPI, requestBody, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.appConstants.accessToken,
          'Content-Type': 'application/json'
        })
     });
  }

  addDevicePost(token: any, requestBody: any) {
    let headers = new Headers();
    headers.append('Token', token);

    return this.http
      .post(this.appConstants.addDeviceAPI, requestBody, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.appConstants.accessToken,
          'Content-Type': 'application/json'
        })
     });
  }

  siteDelete(token: any, requestBody: any) {
    return this.http
      .delete(this.appConstants.deleteSiteAPI, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.appConstants.accessToken,
          'Content-Type': 'application/json'
        })
     });
  }

  deviceDelete(token: any, requestBody: any) {
    return this.http
      .delete(this.appConstants.deleteSiteAPI, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.appConstants.accessToken,
          'Content-Type': 'application/json'
        })
     });
  }

 

}



