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
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any }>;
  user: any;
  token:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public app: App, public weatherServiceProvider: WeatherServiceProvider, public projectJellyService: ProjectJellyServiceProvider, public appConstants: AppConstantsProvider, public authServiceProvider: AuthServiceProvider) {
    this.initializeApp();
    //this.weatherServiceProvider.loadLocationKey();
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
    this.authServiceProvider.logout();
    localStorage.clear();
    setTimeout(() => this.backToLogin(), 1000);
  }


}

