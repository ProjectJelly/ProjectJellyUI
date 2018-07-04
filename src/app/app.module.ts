import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'; 

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
import { ProjectJellyServiceProvider } from '../providers/project-jelly-service/project-jelly-service';
import { GeocodingServiceProvider } from '../providers/geocoding-service/geocoding-service'; 
import { NativeGeocoder,
         NativeGeocoderReverseResult,
         NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { FcmProvider } from '../providers/fcm/fcm';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase';

const firebase = {
    apiKey: "AIzaSyAhU21U_q2eoog_r3fKj6kJLPgaFjM2kZA",
    authDomain: "jellyservices-1529322235729.firebaseapp.com",
    databaseURL: "https://jellyservices-1529322235729.firebaseio.com",
    projectId: "jellyservices-1529322235729",
    storageBucket: "jellyservices-1529322235729.appspot.com",
    messagingSenderId: "541287921876"
  };

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
    ViewPondModule,
    HttpModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule
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
    AppConstantsProvider,
    ProjectJellyServiceProvider,
    GeocodingServiceProvider,
    NativeGeocoder,
    Firebase,
    AngularFirestore,
    AngularFirestoreModule,
    FcmProvider
  ]
})
export class AppModule {}
