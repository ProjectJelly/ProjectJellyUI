import { Component, Input, ViewChild, ElementRef, Renderer } from "@angular/core";
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { JELLY_PROPERTIES } from '../../../config/jelly.properties';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import { ViewPond } from './view-pond';



@Component({
  selector: 'page-manage-ponds',
  templateUrl: 'manage-ponds.html',
})
export class ManagePondsPage {
  private siteList: any;
  private cultureTypeList: any;
  private cultureEnvironmentList: any;
  constructor(private modal: ModalController, public navCtrl: NavController, public projectJellyService: ProjectJellyServiceProvider) { }


  ionViewWillEnter() {

    this.getSite();
    this.getCultureEnvtList();
    this.getCultureTypeList();

  }
  openModal(page: any, param: any) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create(page);
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

  deleteSite() {
    this.projectJellyService.siteDelete(localStorage.getItem('access_token'), localStorage.getItem('username'))
      .subscribe(data => {

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

}

