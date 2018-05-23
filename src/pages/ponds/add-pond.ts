import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

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
})
export class AddPond {

  public isCustomize: boolean;
  constructor(private navParams: NavParams, private view: ViewController) {
    this.isCustomize = false;
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