import { Component, Input, ViewChild, ElementRef, Renderer } from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import { JELLY_PROPERTIES } from '../../../config/jelly.properties';
import { ExpandableComponent } from '../util/expandable-list/expandable';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';

@Component({
  selector: 'page-manage-ponds',
  templateUrl: 'manage-ponds.html'
})
export class ManagePondsPage {
    constructor(private modal: ModalController) {

  }

  openModal() {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {
      name: 'Paul Halliday',
      occupation: 'Developer'
    };

    const myModal: Modal = this.modal.create('ModalPage', { data: myModalData }, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      console.log(data);
    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });

  }
}

