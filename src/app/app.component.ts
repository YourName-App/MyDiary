import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

// Import pages
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { LandingPage } from '../pages/landing/landing';
import { SuggestPage } from '../pages/suggest/suggest';
import { AboutPage } from '../pages/about/about';

// Import providers
import { AuthService } from '../providers/auth-service';

// Import AF2
import { AngularFire } from 'angularfire2';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  index?: number;
  navPush?: boolean;
  logsOut?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  
  // List of pages that can be navigated to from the side menu
  accountPages: PageInterface[] = [
    { title: '註冊帳號', component: SignupPage, navPush: true, icon: 'ios-person-add-outline' },
    { title: '重設密碼', component: ResetPasswordPage, navPush: true, icon: 'ios-refresh-circle-outline' },
    { title: '登出', component: LandingPage, icon: 'log-out', logsOut: true }
  ];

  otherPages: PageInterface[] = [
    { title: '建議', component: SuggestPage, navPush: true, icon: 'ios-chatbubbles-outline' },
    { title: '關於 ', component: AboutPage, navPush: true, icon: 'ios-help-circle-outline' }
  ];

  rootPage: any;
  db: SQLite;

  constructor(platform: Platform, public af: AngularFire, public authServ: AuthService) {
    // Listen for authentication
    af.auth.subscribe( user => {
      if (user) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LandingPage;
      }
    });

    platform.ready().then(() => {
      this.db = new SQLite();
      this.db.openDatabase({
        name: "MyDiary.db",
        location: "default"
      }).then(() => {
        this.create();
        this.add("Nobody", "Eat"  ,"2016-01-01","Hamberger x 1");
        this.add("Nobody", "Sleep","2016-01-02","12 hours");
        this.add("Nobody", "Play" ,"2016-01-03","2 hours of video game");
        this.add("Nobody", "Study","2016-01-04","2 hours of reading");
      }, (error) => {
        console.error("Unable to open database", error);
      });

      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page: PageInterface) {
    if (page.navPush === true) {
      this.nav.push(page.component);
    } else {
      this.nav.setRoot(page.component);
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.authServ.logoutUser();
      }, 1000);
    }
  }

  public create(){
    this.db.executeSql("CREATE TABLE IF NOT EXISTS dairy (name TEXT, title TEXT, date TEXT PRIMARY KEY, content TEXT)", {})
      .then((data) => {
        console.log("TABLE CREATED: ", data);
      }, (error) => {
        console.error("Unable to execute sql", error);
      })
  }

  public add(name:string, title:string, date:string, content:string) {
    this.db.executeSql("INSERT INTO diary (name, title, date, content) VALUES (?,?,?,?,?)", [name, title, date, content])
      .then((data) => {
        console.log("INSERTED: " + JSON.stringify(data));
      }, (error) => {
        console.log("ERROR: " + JSON.stringify(error.err));
      });
  }
}
