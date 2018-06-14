import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(private httpClient: HttpClient) { }
/*
  isAuthenticated() {
    if (localStorage.getItem('loggedIn') === 'true' && this.accessTokenIsValid()) {
      return false;
    } else {
      return true;
    }
  }

  accessTokenIsValid() {
    this.httpClient.get('http://localhost:8080/api/v1/users', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      })
    }).subscribe(res => { //access token is still valid
      return true;
    }, err => { //access token is no longer valid
      console.log("Invalid");
      if (err.error.error_description.includes("Access token expired")) {
        return false;
      }
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

    let params = new HttpParams();
    params = params.set('username', username);
    params = params.set('password', password);
    params = params.set('grant_type', 'password');

    this.httpClient.post('http://localhost:8080/oauth/token', params, httpOptions)
      .subscribe(response => {
        authItems = [
          // { key: 'access_token', value: response.access_token },
          // { key: 'refresh_token', value: response.refresh_token },
          // { key: 'expires_in', value: response.expires_in },
          { key: 'loggedIn', value: 'true' },
        ];
        this._setSession(authItems);
      });
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
    });
  }*/

}
