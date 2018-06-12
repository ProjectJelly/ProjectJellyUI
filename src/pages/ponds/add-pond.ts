import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

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

  constructor(private navParams: NavParams, private view: ViewController, private _FB: FormBuilder) {
    // this. = false;
    //this.isCustomizeThresh=false;

    // this.form = this.formBuilder.group({
    //   devices: this.formBuilder.array([this.initDeviceFields()])
    // });
    this.form = this._FB.group({
         devices     : this._FB.array([
            
         ])
      });
  }

  initDeviceFields(): FormGroup{
    return this._FB.group({
      device: ['', Validators.required]
    });
  }  
  
  addNewDeviceField() : void {
      const control = <FormArray>this.form.controls.devices;
      control.push(this.initDeviceFields());
   }
   
   removeDeviceField(i : number) : void
   {
      const control = <FormArray>this.form.controls.devices;
      control.removeAt(i);
   }


   manage(val: any): void{
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
}