import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'add-pond',
  templateUrl: 'add-pond.html',
  styleUrls: ['/pages/ponds/modal-ponds.scss']
})
export class AddPond {

  // public isCustomizeReading: boolean;
  // public isCustomizeThresh: boolean;
  public form: FormGroup;

  constructor(private navParams: NavParams, private view: ViewController, private formBuilder: FormBuilder, public projectJellyService: ProjectJellyServiceProvider, private toast: ToastController) {
    // this. = false;
    //this.isCustomizeThresh=false;

    // this.form = this.formBuilder.group({
    //   devices: this.formBuilder.array([this.initDeviceFields()])
    // });
    this.form = this.formBuilder.group({

      devices: this.formBuilder.array([

      ]),
      siteName: ['', Validators.required],
      location: ['', Validators.required],
      siteSize: ['', Validators.required],
      waterDepth: ['', Validators.required],
      cultureEnvironment: ['', ''],
      cultureType: ['', ''],
      readingInterval: ['', ''],
      species: ['', ''],
    });
  }

  initDeviceFields(): FormGroup {
    return this.formBuilder.group({
      device: ['', Validators.required]
    });
  }

  addNewDeviceField(): void {
    const control = <FormArray>this.form.controls.devices;
    control.push(this.initDeviceFields());
  }

  removeDeviceField(i: number): void {
    const control = <FormArray>this.form.controls.devices;
    control.removeAt(i);
  }


  manage(val: any): void {
    console.dir(val);
  }

  closeModal() {
    console.log("form:", this.form);
    const data = {
      name: 'John Doe',
      occupation: 'Milkman'
    };
    this.view.dismiss(data);
  }

  getUser() {
    this.projectJellyService.userGet(localStorage.getItem('access_token'), localStorage.getItem('username'))
      .subscribe(data => {

      }
      );
  }

  editProfile() {
    let requestBody = new FormData();
    let formObj = this.form.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    this.projectJellyService.editUserPut(localStorage.getItem('access_token'), serializedForm)
      .subscribe(data => {
        this.presentSuccessToast();
      }, (err) => {
        this.presentErrorToast();
      }
      );
  }

  presentSuccessToast() {
    let toast = this.toast.create({
      message: 'You have edited your profile successfully!',
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