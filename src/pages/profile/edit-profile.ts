import { Component, Input, ViewChild, ElementRef, Renderer } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { JELLY_PROPERTIES } from '../../../config/jelly.properties';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

  private user: any;
  private form: FormGroup;
  private username: any;
  private successMessage: 'You have edited your profile successfully!';
  private errorMessage: 'Hmmm. There seems to be something wrong. Please try again.';
  
  constructor(public navCtrl: NavController, public projectJellyService: ProjectJellyServiceProvider, public appConstants: AppConstantsProvider, private formBuilder: FormBuilder, private toast: ToastController) {
  }

  ionViewWillEnter() {
    this.getUser();
  }

  setForm() {
    if (this.user) {
      this.form = this.formBuilder.group({
        username: [this.user.data.username, Validators.required],
        password: [this.user.data.password, Validators.required],
        contactNo: [this.user.data.contactNo, Validators.required],
        email: [this.user.data.email, Validators.required],
        id: [this.user.data.id, ''],
        roles: this.formBuilder.array([this.user.data.roles])

      });
    }
  }

  getUser() {
    this.projectJellyService.userGet(localStorage.getItem('access_token'), localStorage.getItem('username'))
      .subscribe(data => {
        console.log('user', data);
        this.user = data;
        this.setForm();
      }
      );
  }

  editProfile() {
    let requestBody = new FormData();
    let formObj = this.form.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    this.projectJellyService.editUserPut(localStorage.getItem('access_token'), serializedForm)
      .subscribe(data => {
        this.presentSuccessToast(this.successMessage);
      }, (err) => {
        this.presentErrorToast(this.errorMessage);
      }
      );
  }

  presentSuccessToast(messageString: any) {
    let toast = this.toast.create({
      message: 'You have edited your profile successfully!',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  presentErrorToast(messageString: string) {
    let toast = this.toast.create({
      message: 'Hmmm. There seems to be something wrong. Please try again.',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }
}

