import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(public firebaseNative: Firebase, public afs: AngularFirestore, private platform: Platform) {
  }

  async getToken(){
    let token;

    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken();
      alert('token in android:'+ token);
    }

    return this.saveTokenToFirestore(token);

  }

  private saveTokenToFirestore(token){
    if(!token) return;
    const devicesRef = this.afs.collection('devices');

    var username = localStorage.getItem('username');
    const docData = {
      token,
      userId: username
    }

    return devicesRef.doc(token).set(docData);
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }


}
