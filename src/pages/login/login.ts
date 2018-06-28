import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private form: FormGroup;
  private isAuthenticatedToken: boolean;

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, private formBuilder: FormBuilder, private toast: ToastController, public projectJellyService: ProjectJellyServiceProvider, ) { }

  ngOnInit() {
  }

  ionViewCanEnter() {
    this.setLoginForm();
    this.getAuthentication();
  }


  login() {
    var username = this.form.value['username'];
    var password = this.form.value['password'];
    this.projectJellyService.showLoading();
    
    this.authServiceProvider.login(username, password)
    .subscribe(response => {
        console.log('post taken', response)
        if (response) {
          console.log('store');
          localStorage.setItem('access_token', response["access_token"]);
          localStorage.setItem('refresh_token', response["refresh_token"]);
          localStorage.setItem('expires_in', response["expires_in"]);
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('username', username);
        }
        this.navCtrl.push(HomePage); 
        this.projectJellyService.dismissLoading();
      }, (err) => {
        this.presentErrorToast();
        localStorage.clear();
        this.projectJellyService.dismissLoading();
      })
    ;
    // if (!this.authServiceProvider.login(username, password)) {
    //   this.presentErrorToast();
    //   localStorage.clear();
    //   this.projectJellyService.dismissLoading();
    // } else {
    //   localStorage.setItem('username', username);
    //   this.projectJellyService.dismissLoading();
      
    // }

  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }

  setLoginForm() {
    this.form = this.formBuilder.group({
      username: ['', ''],
      password: ['', '']
    });
  }

  presentErrorToast() {
    let toast = this.toast.create({
      message: 'Invalid username or password! Please try again.',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  getAuthentication() {
    this.authServiceProvider.accessTokenIsValid().subscribe(res => { //access token is still valid
      if (localStorage.getItem('loggedIn') === 'true') {
        console.log('isValid');
          this.navCtrl.push(HomePage);
      } 
    }, err => { //access token is no longer valid
      if (err.error.error_description.includes("Access token expired")) {
        this.isAuthenticatedToken = false;
      }
    });
  }

}

