import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ManagePondsPage } from '../pages/ponds/manage-ponds';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { HistoryPage } from '../pages/history/history';
import { LoginPage } from '../pages/login/login';
import { EditProfilePage } from '../pages/profile/edit-profile';
import { WeatherServiceProvider } from '../providers/weather-service/weather-service';
import { ProjectJellyServiceProvider } from '../providers/project-jelly-service/project-jelly-service';
import { AppConstantsProvider } from '../providers/app-constants/app-constants';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any }>;
  user: any;
  token:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public app: App, public weatherServiceProvider: WeatherServiceProvider, public projectJellyService: ProjectJellyServiceProvider, public appConstants: AppConstantsProvider) {
    this.initializeApp();
    this.getUser();
    this.weatherServiceProvider.loadLocationKey();
    this.pages = [
      { title: 'Stream', component: HomePage },
      { title: 'Manage Ponds/Devices', component: ManagePondsPage },
      { title: 'Analytics', component: AnalyticsPage },
      { title: 'History', component: HistoryPage },
      { title: 'Edit Profile', component: EditProfilePage },
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  backToLogin() {
    this.nav.setRoot(this.rootPage);
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout() {
    //Api Token Logout 
    localStorage.clear();
    setTimeout(() => this.backToLogin(), 1000);
  }


  getUser() {
    let body = new FormData();
    body.append('email', 'email');
    body.append('password', 'password');
    this.projectJellyService.editUserPut('token', 'body')
      .subscribe(data => {
        this.user = data
        console.log("post", this.user);
      }    
    );
  }

}

