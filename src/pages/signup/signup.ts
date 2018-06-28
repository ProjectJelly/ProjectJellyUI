import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  private form: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private projectJellyService: ProjectJellyServiceProvider,  private toast: ToastController) {}

  ionViewCanEnter(){
    this.setSignUpForm();
  }

  loginPage(){
    this.navCtrl.push(LoginPage);
  }

  setSignUpForm() {
    this.form = this.formBuilder.group({
      username: ['', ''],
      password: ['', ''],
      email: ['', ''],
      contactNo: ['', '']
    });
  }

  signUp(){
    this.projectJellyService.showLoading();
    let requestBody = new FormData();
    let formObj = this.form.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    this.projectJellyService.addUserPost(localStorage.getItem('access_token'), serializedForm)
      .subscribe(data => {
        console.log('add user', data);
        this.presentSuccessToast();
        this.navCtrl.push(LoginPage);
        this.projectJellyService.dismissLoading();
      }, (err) => {
        this.presentErrorToast();
        this.projectJellyService.dismissLoading();
      }
      );
  }

  presentSuccessToast() {
    let toast = this.toast.create({
      message: 'You are now part of project jelly! You may now login.',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  presentErrorToast() {
    let toast = this.toast.create({
      message: 'Hmmm. There seems to be something wrong. Please try again.',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }
}

