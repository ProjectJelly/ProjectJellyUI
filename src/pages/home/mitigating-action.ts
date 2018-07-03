import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Platform } from 'ionic-angular';


/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'mitigating-action',
  templateUrl: 'mitigating-action.html'
//   styleUrls: ['/pages/ponds/modal-ponds.scss']
})
export class MitigatingAction {

    private mitigatingActions:any;
  constructor(private platform: Platform, private navParams: NavParams, private view: ViewController) {
    let requestBodyData = navParams.get('data');
    this.mitigatingActions = requestBodyData;
    console.log('this.mitigatingActions', this.mitigatingActions);
  }

  closeModal() {
    this.view.dismiss();
  }
}