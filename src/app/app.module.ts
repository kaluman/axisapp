import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { SplashScreen } from '@ionic-native/splash-screen'

import { StatusBar } from '@ionic-native/status-bar';
import { AuthData } from '../providers/auth-data';;
import { Camera } from '@ionic-native/camera';

// Importing Providers

// Importing AF2 Module

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
const firebaseConfig = {
    apiKey: "AIzaSyAH71fwhqvUMVeVC2gt_D-PZ1zGtWzANvY",
    authDomain: "work-tracker-d56d3.firebaseapp.com",
    databaseURL: "https://work-tracker-d56d3.firebaseio.com",
    storageBucket: "work-tracker-d56d3.appspot.com",
    messagingSenderId: "944684400494"
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SignupPage,
    TabsPage
  ],
  imports: [
      IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SignupPage,
    TabsPage
  ],
  providers: [
      StatusBar,
      SplashScreen,
      Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthData
  ]
})
export class AppModule {}
