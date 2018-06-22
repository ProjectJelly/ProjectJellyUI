import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  private isAccessTokenValid: any;
  constructor(private httpClient: HttpClient, public appConstants: AppConstantsProvider) { }


  isAuthenticated() {
    if (localStorage.getItem('loggedIn') === 'true' && this.accessTokenIsValid()) {
      console.log('is valid');
      return true;
    } else {
      console.log('is not');
      return false;
    }
  }

  accessTokenIsValid() {
    return this.httpClient.get('https://jelly-ws.azurewebsites.net/api/v1/users', {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json'
        })
      }); 
  }

  login(username: string, password: string) {
    let authItems: any[];
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic amVsbHlXZWJBcHA6WGh5SFQyM0hjZg==',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    let params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    return this.httpClient.post('https://jelly-ws.azurewebsites.net/oauth/token', params.toString(), httpOptions)
      .subscribe(response => {
        console.log('post taken', response)
        if (response) {
          console.log('store');
          localStorage.setItem('access_token', response["access_token"]);
          localStorage.setItem('refresh_token', response["refresh_token"]);
          localStorage.setItem('expires_in', response["expires_in"]);
          localStorage.setItem('loggedIn', 'true');
        }
        return true;

      }, (err) => {
        return false;
      })
    ;


  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
    localStorage.setItem('loggedIn', 'false');
  }

  private _setSession(storageItems: any[]) {
    storageItems.forEach(item => {
      localStorage.setItem(item.key, item.value);
      console.log('saved local storage');
    });
  }

}
