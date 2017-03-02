import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

// Import pages
import { LandingPage } from '../pages/landing/landing';
import { HomePage } from '../pages/home/home';
import { SuggestPage } from '../pages/suggest/suggest';
import { AboutPage } from '../pages/about/about';
import { UserConfigPage } from '../pages/user-config/user-config';
import { PinConfigPage } from '../pages/pin-config/pin-config';

// Import providers
import { AuthService } from '../providers/auth-service';
import { ConfigService } from '../providers/config-service';

// Import AF2
import { AngularFire } from 'angularfire2';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  pushPage?: boolean;
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
    { title: '使用者', component: UserConfigPage, pushPage: true, icon: 'ios-person-outline' },
    { title: '密碼鎖', component: PinConfigPage, pushPage: true, icon: 'ios-lock-outline' },
  ];

  otherPages: PageInterface[] = [
    { title: '建議', component: SuggestPage, pushPage: true, icon: 'ios-chatbubbles-outline' },
    { title: '關於 ', component: AboutPage, pushPage: true, icon: 'ios-help-circle-outline' }
  ];

  accountPages: PageInterface[] = [
    { title: '登出', component: LandingPage, icon: 'log-out', logsOut: true }
  ];

  constructor(platform: Platform,
    private af: AngularFire, private authServ: AuthService,
    private configServ: ConfigService) {

    // Listen for authentication
    af.auth.subscribe((user) => {
      if (user) {
        this.rootPage = HomePage;
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
      this.configServ.setMusicPlayed(false);

      // Listen for pause event (emits when the native platform puts the application into the background)
      platform.pause.subscribe(() => {
        this.configServ.setPauseEmitted('Y');

        if (this.configServ.getUserPin().length >= 4) {
          this.nav.setRoot(HomePage);
        }
      });
    }, (error) => {
      console.log(error);
    });
  }

  openPage(page: PageInterface) {
    if (page.pushPage === true) {
      this.nav.push(page.component);
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
