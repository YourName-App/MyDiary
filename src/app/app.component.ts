import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import pages
import { LandingPage } from '../pages/landing/landing';
import { HomePage } from '../pages/home/home';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { AboutPage } from '../pages/about/about';
import { UserConfigPage } from '../pages/user-config/user-config';
import { PinConfigPage } from '../pages/pin-config/pin-config';
import { LocaleConfigPage } from '../pages/locale-config/locale-config';

// Import providers
import { AuthService } from '../providers/auth-service';
import { ConfigService } from '../providers/config-service';
import { LocaleService } from '../providers/locale-service'

// Import AF2
import { AngularFireAuth } from 'angularfire2/auth';

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
    { title: '', component: UserConfigPage, pushPage: true, icon: 'ios-person-outline' },  // 使用者
    { title: '', component: LocaleConfigPage, pushPage: true, icon: 'ios-globe-outline' }, // 語言
    { title: '', component: PinConfigPage, pushPage: true, icon: 'ios-lock-outline' }      // 密碼鎖
  ];

  otherPages: PageInterface[] = [
    { title: '', component: SuggestionPage, pushPage: true, icon: 'ios-chatbubbles-outline' },// 建議
    { title: '', component: AboutPage, pushPage: true, icon: 'ios-help-circle-outline' }      // 關於
  ];

  accountPages: PageInterface[] = [
    { title: '登出', component: LandingPage, icon: 'log-out', logsOut: true }
  ];

  constructor(private platform: Platform, private statusBar: StatusBar,
    private splashScreen: SplashScreen, private afAuth: AngularFireAuth,
    private authServ: AuthService, private configServ: ConfigService,
    private localeServ:LocaleService) {

      this.localeServ.subscribe('PAGE.SETTING.USER',    (value:string) => {this.settingPages[0].title   = value; });
      this.localeServ.subscribe('PAGE.SETTING.LOCALE',  (value:string) => {this.settingPages[1].title   = value; });
      this.localeServ.subscribe('PAGE.SETTING.LOCK',    (value:string) => {this.settingPages[2].title   = value; });

      this.localeServ.subscribe('PAGE.OTHER.SUGGESTION', (value:string) => {this.otherPages[0].title   = value; });
      this.localeServ.subscribe('PAGE.OTHER.ABOUT',      (value:string) => {this.otherPages[1].title   = value; });

      this.localeServ.subscribe('PAGE.ACCOUNT.LOGOUT',   (value:string) => {this.accountPages[0].title = value; });

    // Listen for authentication
    const authListener = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        // authListener.unsubscribe();
      } else {
        this.rootPage = LandingPage;
        //authListener.unsubscribe(); 
      }

      localeServ.updatePageLocale();
    }, (error) => {
      console.log(error);  
    });

    platform.ready().then(() => {
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
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
