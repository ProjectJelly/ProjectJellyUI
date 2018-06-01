import { Component, Input, ViewChild, ElementRef, Renderer } from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import { JELLY_PROPERTIES } from '../../../config/jelly.properties';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

    constructor(public navCtrl: NavController) {
 
    }
}

