import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { RequestMethod, RequestOptions, Headers } from '@angular/http';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';


@Injectable()
export class ProjectJellyServiceProvider {
  private loading: any;
  constructor(public http: HttpClient, public appConstants: AppConstantsProvider, public loadingController:LoadingController) {
  }

  userGet(token: any, username: string) {
    var url = this.appConstants.getUserAPI + username + '/';
    console.log('url', url);
    return this.http.get(this.appConstants.getUserAPI + username, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  siteGet(token: any, param: any) {
    var url = this.appConstants.getSitesAPI + param + '/';
    console.log('url', url);
    return this.http.get(this.appConstants.getSitesAPI + param + '/', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  siteByIdGet(token: any, param: any) {
    return this.http.get(this.appConstants.getSiteAPI + param, {
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

  speciesGet(token: any) {
    return this.http.get(this.appConstants.getSpeciesAPI, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  streamGet(token: any, param: any) {
    return this.http.get(this.appConstants.getStreamAPI + param, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  analyticsGet(token: any, param: any) {
    return this.http.get(this.appConstants.getAnalyticsAPI + param, {
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
      .put(this.appConstants.editSiteAPI, requestBody, {
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
      .delete(this.appConstants.deleteSiteAPI + requestBody, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
      });
  }

  deviceDelete(token: any, deviceId: any) {
    return this.http
      .delete(this.appConstants.deleteDeviceAPI + deviceId, {
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

  showLoading() {
    if (!this.loading) {
      this.loading = this.loadingController.create({
        content: 'Please Wait...'
      });
      this.loading.present();
    }
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }


}



