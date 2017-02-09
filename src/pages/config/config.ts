import { Component } from '@angular/core';
import { NavController, ViewController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  theme: string;
  userName: string;
  userGender: string;
  userAvatar: string;

  
  constructor(private navCtrl: NavController, private viewCtrl: ViewController,
    private appCtrl: App, private storage: Storage,
    private configServ: ConfigService) {

    this.userName = this.configServ.getUserName();
    this.userGender = this.configServ.getUserGender();

    /*
    // Get user name
    this.storage.get('userName').then((val) => {
      this.userName = val;
    }, (error) => {
      console.log(error);
    })

    // Get user gender
    this.storage.get('userGender').then((val) => {
      this.userGender = val;
    }, (error) => {
      console.log(error);
    })
    */
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateSetting() {
    if (this.userName === null || this.userName.trim().length === 0) {
      this.userName = '你的名字是？';
    }

    this.storage.set('userName', this.userName);
    this.storage.set('userGender', this.userGender);

    if (this.userGender === null || this.userGender.trim().length === 0) {
      this.userAvatar = 'userAvatar', 'assets/img/avatar-male.png';
      this.storage.set('userAvatar', this.userAvatar);
    } else {
      this.userAvatar = 'assets/img/avatar-' + this.userGender + '.png';
      this.storage.set('userAvatar', this.userAvatar);
    }

    this.configServ.setUserName(this.userName);
    this.configServ.setUserGender(this.userGender);
    this.configServ.setUserAvatar(this.userAvatar);
    
    this.dismiss();
    this.appCtrl.getRootNav().setRoot(HomePage);
  }  
}
