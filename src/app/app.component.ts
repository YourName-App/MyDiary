import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar, Splashscreen, SQLite } from "ionic-native";

// Import pages
import { TabsPage } from "../pages/tabs/tabs";
import {LandingPage} from '../pages/landing/landing';

// Import AF2
import { AngularFire } from 'angularfire2';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;
  db: SQLite;

  constructor(platform: Platform, public af: AngularFire) {
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
