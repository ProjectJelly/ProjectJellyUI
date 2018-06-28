import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ViewController, Modal, ModalController, ModalOptions } from 'ionic-angular';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';
import { ToastController } from 'ionic-angular';

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
  styleUrls: ['/pages/ponds/manage-ponds.scss']
})
export class ViewPond {

  public isCustomizeReading: boolean;
  public isCustomizeThresh: boolean;
  private site: any;
  private cultureTypeList: any;
  private cultureEnvironmentList: any;
  private deviceList: any;

  constructor(private navParams: NavParams, public navCtrl: NavController, private view: ViewController, private modal: ModalController, public projectJellyService: ProjectJellyServiceProvider, private toast: ToastController) {
    this.isCustomizeReading = false;
    this.isCustomizeThresh = false;
  }

  ionViewWillEnter() {
    this.getSiteById();
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

  getSiteById() {
    this.projectJellyService.showLoading();
    this.projectJellyService.siteByIdGet(localStorage.getItem('access_token'), this.navParams.get('siteId'))
      .subscribe(data => {
        console.log('getSiteById',data);
        this.site = data['data'];
        if(this.site.devicesDto){
          this.deviceList = this.site.devicesDto;

        }
        this.projectJellyService.dismissLoading();
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



  delete(param: any) {
    this.projectJellyService.deviceDelete(localStorage.getItem('access_token'), param['id'])
      .subscribe(data => {
        let index = this.deviceList.findIndex(d => d.id === param['id']); //find index in your array
        this.deviceList.splice(index, 1);//remove element from array
        // let index = this.deviceList.indexOf(param);
        // if (index > -1) {
        //   this.deviceList.splice(index, 1);
        // }
      }, (err) => {
        this.presentErrorToast();
      }
      );
  }

  presentErrorToast() {
    let toast = this.toast.create({
      message: 'Hmmm. There seems to be something wrong. Please try again.',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.getSiteById();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}