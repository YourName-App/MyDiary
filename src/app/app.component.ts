import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

// Import pages
import { LandingPage } from '../pages/landing/landing';
import { HomePage } from '../pages/home/home';
import { SuggestPage } from '../pages/suggest/suggest';
import { AboutPage } from '../pages/about/about';
import { SettingPage } from '../pages/setting/setting';
import { DiaryEditPage } from '../pages/diary-edit//diary-edit';

// Import providers
import { AuthService } from '../providers/auth-service';

// Import AF2
import { AngularFire } from 'angularfire2';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  createModal?: boolean;
  logsOut?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  
  // List of pages that can be navigated to from the side menu
  settingPages: PageInterface[] = [
    { title: '設定', component: SettingPage, createModal: true, icon: 'ios-build-outline' }
  ];

  otherPages: PageInterface[] = [
    { title: '建議', component: SuggestPage, createModal: true, icon: 'ios-chatbubbles-outline' },
    { title: '關於 ', component: AboutPage, createModal: true, icon: 'ios-help-circle-outline' }
  ];

  accountPages: PageInterface[] = [
    { title: '登出', component: LandingPage, icon: 'log-out', logsOut: true }
  ];

  constructor(platform: Platform, storage: Storage, public af: AngularFire, 
    public authServ: AuthService, public modalCtrl: ModalController) {

    // Listen for authentication
    af.auth.subscribe((user) => {
      if (user) {
        this.rootPage = HomePage;
        //this.rootPage = DiaryEditPage;
      } else {
        this.rootPage = LandingPage;
      }
    }, (error) => {
      console.log(error);
    });

    platform.ready().then(() => {
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    }, (error) => {
      console.log(error);
    });
  }

  openPage(page: PageInterface) {
    if (page.createModal === true) {
      this.modalCtrl.create(page.component).present();
    } else {
      this.nav.setRoot(page.component);
    }

    if (page.logsOut === true) {
      setTimeout(() => {
        this.authServ.logoutUser();
      }, 200);
    }
  }
}
