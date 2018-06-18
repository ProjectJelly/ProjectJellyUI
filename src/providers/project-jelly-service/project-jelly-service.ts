import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { RequestMethod, RequestOptions, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';


@Injectable()
export class ProjectJellyServiceProvider {

  constructor(public http: HttpClient, public appConstants: AppConstantsProvider) {
  }

  userGet(token: any, username: string) {
    return this.http.get(this.appConstants.getUserAPI + username, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
     });
  }

  siteGet(token: any) {
    return this.http.get(this.appConstants.getSiteAPI, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
     });
  }

  cultureEnvtGet() {
    return this.http.get(this.appConstants.getCultureEnvironmentAPI);
  }

  cultureTypeGet() {
    return this.http.get(this.appConstants.getCultureTypeAPI);
  }

  hoursGet() {
    return this.http.get(this.appConstants.getHoursAPI);
  }

  speciesGet(token:any) {
    console.log('speciesgetotke,', token);
    return this.http.get(this.appConstants.getSpeciesAPI, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
     });
  }

  readingGet(token: any, username: any) {
    return this.http.get(this.appConstants.getReadingAPI, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
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
          'Authorization': 'Bearer ' + token,
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
          'Authorization': 'Bearer ' + token,
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
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
     });
  }

  addSitePost(token: any, requestBody: any) {
    return this.http
      .post(this.appConstants.addSiteAPI, requestBody, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
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
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
     });
  }

  siteDelete(token: any, requestBody: any) {
    return this.http
      .delete(this.appConstants.deleteSiteAPI, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
     });
  }

  deviceDelete(token: any, requestBody: any) {
    return this.http
      .delete(this.appConstants.deleteSiteAPI, { 
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
     });
  }

  // presentSuccessToast() {
  //   let toast = this.toast.create({
  //     message: 'You have added a pond successfully!',
  //     position: 'middle',
  //     duration: 3000
  //   });
  //   toast.present();
  // }

  // presentErrorToast() {
  //   let toast = this.toast.create({
  //     message: 'Hmmm. There seems to be something wrong. Please try again.',
  //     position: 'middle',
  //     duration: 3000
  //   });
  //   toast.present();
  // }

 

}



