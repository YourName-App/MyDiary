import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Splashscreen } from 'ionic-native';

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
import { LocaleService, LocaleUpdatedTarget } from '../providers/locale-service'

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
    { title: '關於', component: AboutPage, pushPage: true, icon: 'ios-help-circle-outline' }
  ];

  accountPages: PageInterface[] = [
    { title: '登出', component: LandingPage, icon: 'log-out', logsOut: true }
  ];

  localeUpdatedUserConfigPage: LocaleUpdatedTarget = {
    component: this.settingPages[0], 
    mapping: 'PAGE.SETTING.USER',
    update: (component:PageInterface, value: string) => {
      component.title = value;
    }
  };

  localeUpdatedPinConfigPage: LocaleUpdatedTarget = {
    component: this.settingPages[1], 
    mapping: 'PAGE.SETTING.LOCK',
    update: (component:PageInterface, value: string) => {
      component.title = value;
    }
  };

  localeUpdatedSuggestPage: LocaleUpdatedTarget = {
    component: this.otherPages[0], 
    mapping: 'PAGE.OTHER.SUGGESTION',
    update: (component:PageInterface, value: string) => {
      component.title = value;
    }
  };

  localeUpdatedAboutPage: LocaleUpdatedTarget = {
    component: this.otherPages[1], 
    mapping: 'PAGE.OTHER.ABOUT',
    update: (component:PageInterface, value: string) => {
      component.title = value;
    }
  };

  localeUpdatedLandingPage: LocaleUpdatedTarget = {
    component: this.accountPages[0], 
    mapping: 'PAGE.ACCOUNT.LOGOUT',
    update: (component:PageInterface, value: string) => {
      component.title = value;
    }
  };

  constructor(private platform: Platform, private af: AngularFire,
    private authServ: AuthService, private configServ: ConfigService, 
    private localeServ:LocaleService) {

    this.localeServ.subscribeLocaleUpdateTarget(this.localeUpdatedUserConfigPage);
    this.localeServ.subscribeLocaleUpdateTarget(this.localeUpdatedPinConfigPage);
    this.localeServ.subscribeLocaleUpdateTarget(this.localeUpdatedSuggestPage);
    this.localeServ.subscribeLocaleUpdateTarget(this.localeUpdatedAboutPage);
    this.localeServ.subscribeLocaleUpdateTarget(this.localeUpdatedLandingPage);

    // Listen for authentication
    af.auth.subscribe((user) => {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LandingPage;
      }

      localeServ.updatePageLocale();

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
