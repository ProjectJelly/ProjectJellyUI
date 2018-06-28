import { Component, Input, ViewChild, ElementRef, Renderer } from "@angular/core";
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { JELLY_PROPERTIES } from '../../../config/jelly.properties';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import { ViewPond } from './view-pond';
import { ToastController } from 'ionic-angular';



@Component({
  selector: 'page-manage-ponds',
  templateUrl: 'manage-ponds.html',
})
export class ManagePondsPage {
  private siteList: any;
  private cultureTypeList: any;
  private cultureEnvironmentList: any;
  constructor(private modal: ModalController, public navCtrl: NavController, public projectJellyService: ProjectJellyServiceProvider, private toast: ToastController) { }


  ionViewWillEnter() {

    this.getSite();
    this.getCultureEnvtList();
    this.getCultureTypeList();

  }
  openModal(page: any, param: any) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    console.log('param edit',param);
    let requestBody: any = {};
    requestBody = {};
    requestBody = param;
    console.log('requestBody',requestBody);
    const myModal: Modal = this.modal.create(page, {data: requestBody});
    myModal.present();
  }


  goToSite(param: any) {
    console.log('param', param);
    this.navCtrl.push(ViewPond, {siteId: param});
  }

  getSite() {
    this.projectJellyService.showLoading();
    this.projectJellyService.siteGet(localStorage.getItem('access_token'), localStorage.getItem('username'))
      .subscribe(data => {
        this.siteList = data['data'];
        this.projectJellyService.dismissLoading();
      }
      );
  }

  deleteSite(id: any) {
    this.projectJellyService.showLoading();
    this.projectJellyService.siteDelete(localStorage.getItem('access_token'), id)
      .subscribe(data => {
        console.log('data delete', data);
        let index = this.siteList.findIndex(d => d.id === id); //find index in your array
        this.siteList.splice(index, 1);//remove element from array
        this.projectJellyService.dismissLoading();
        this.presentSuccessToast();
      }
      );
  }

  getCultureTypeList() {
    this.projectJellyService.cultureTypeGet()
      .subscribe(data => {
        this.cultureTypeList = data['cultureType'];
      }
      );
  }

  getCultureEnvtList() {
    this.projectJellyService.cultureEnvtGet()
      .subscribe(data => {
        this.cultureEnvironmentList = data['cultureEnv'];
      }
      );
  }

  presentSuccessToast() {
    let toast = this.toast.create({
      message: 'You have deleted this pond successfully!',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  presentErrorToast() {
    let toast = this.toast.create({
      message: 'Hmmm. There seems to be something wrong. Please try again.',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

}

