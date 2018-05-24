import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ManagePondsPage } from '../ponds/manage-ponds';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  constructor(public navCtrl: NavController) {

  }

}

