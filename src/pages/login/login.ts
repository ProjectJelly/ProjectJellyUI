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

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, private formBuilder: FormBuilder, private toast: ToastController, public projectJellyService: ProjectJellyServiceProvider,) { }

  ngOnInit() {
    this.setLoginForm()
    if (this.authServiceProvider.isAuthenticated()) {
      this.navCtrl.push(HomePage);
    }
  }

  login() {
    var username = this.form.value['username'];
    var password = this.form.value['password'];

    this.projectJellyService.showLoading();
    if (!this.authServiceProvider.login(username, password)) {
      this.presentErrorToast();
    } else {
      this.navCtrl.push(HomePage);
    }
    this.projectJellyService.dismissLoading();

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

}

