import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ManagePondsPage } from '../pages/ponds/manage-ponds';
import { ViewPondModule } from '../pages/ponds/view-pond.module';
import { ViewPond } from '../pages/ponds/view-pond';
import { AddPond } from '../pages/ponds/add-pond';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { HistoryPage } from '../pages/history/history';
import { EditProfilePage } from '../pages/profile/edit-profile';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { WeatherServiceProvider } from '../providers/weather-service/weather-service';
import { AppConstantsProvider } from '../providers/app-constants/app-constants';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ManagePondsPage,
    AnalyticsPage,
    HistoryPage,
    EditProfilePage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ViewPondModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ManagePondsPage,
    AnalyticsPage,
    HistoryPage,
    EditProfilePage,
    LoginPage,
    SignupPage,
    ViewPond
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    WeatherServiceProvider,
    AppConstantsProvider
  ]
})
export class AppModule {}
