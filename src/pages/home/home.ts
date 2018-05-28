import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ManagePondsPage } from '../ponds/manage-ponds';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  mitigatingActionPopUp(className: string){
    let alert = this.alertCtrl.create({
        title: 'MITIGATING ACTION',
        subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
        buttons: ['Ok'],
        cssClass: className
      });
 
    alert.present();
  }
}

