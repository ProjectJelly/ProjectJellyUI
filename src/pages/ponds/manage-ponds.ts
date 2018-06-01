import { Component, Input, ViewChild, ElementRef, Renderer } from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import { JELLY_PROPERTIES } from '../../../config/jelly.properties';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';



@Component({
  selector: 'page-manage-ponds',
  templateUrl: 'manage-ponds.html',
})
export class ManagePondsPage {
  public items = [{'name': 1} ,{'name': 2},{'name': 3}];
    constructor(private modal: ModalController) {}

  openModal(page: any) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create(page);

    myModal.present();

  }

  itemDetails() 
  {
    console.log("item details");
  }
  
  removeItem() 
  {
    console.log("remove item");
  }
  
}

