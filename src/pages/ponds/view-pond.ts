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
  selector: 'view-pond',
  templateUrl: 'view-pond.html',
  styleUrls: ['/pages/ponds/modal-ponds.scss']
})
export class ViewPond {

  public isCustomizeReading: boolean;
  public isCustomizeThresh: boolean;

  constructor(private navParams: NavParams, private view: ViewController) {
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