import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'edit-pond',
  templateUrl: 'edit-pond.html',
  styleUrls: ['/pages/ponds/modal-ponds.scss']
})
export class EditPond {

  public isCustomizeReading: boolean;
  public isCustomizeThresh: boolean;

  constructor(private navParams: NavParams, private view: ViewController, private toast: Toast) {
    this.isCustomizeReading = false;
    this.isCustomizeThresh=false;
  }

  ionViewWillLoad() {
    
  }

  closeModal() {
    const data = {
      name: 'John Doe',
      occupation: 'Milkman'
    };
    this.view.dismiss(data);
  }
}