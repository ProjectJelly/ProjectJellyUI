import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'view-pond',
  templateUrl: 'view-pond.html',
  styleUrls: ['/pages/ponds/manage-ponds.scss']
})
export class ViewPond {

  public isCustomizeReading: boolean;
  public isCustomizeThresh: boolean;

  constructor(private navParams: NavParams, private view: ViewController, private modal: ModalController,) {
    this.isCustomizeReading = false;
    this.isCustomizeThresh=false;
  }

  openModal(page: any) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create(page);

    myModal.present();

  }
}