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
  yourName: string;
  yourGender: string;
  yourAvatar: string;

  
  constructor(private navCtrl: NavController, private viewCtrl: ViewController,
    private appCtrl: App, private storage: Storage,
    private configServ: ConfigService) {

    // Get user name
    this.storage.get('yourName').then((val) => {
      this.yourName = val;
    }, (error) => {
      console.log(error);
    })

    // Get user gender
    this.storage.get('yourGender').then((val) => {
      this.yourGender = val;
    }, (error) => {
      console.log(error);
    })
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateSetting() {
    if (this.yourName === null || this.yourName.trim().length === 0) {
      this.yourName = '你的名字是？';
    }

    this.storage.set('yourName', this.yourName);
    this.storage.set('yourGender', this.yourGender);

    if (this.yourGender === null || this.yourGender.trim().length === 0) {
      this.yourAvatar = 'yourAvatar', 'assets/img/avatar-male.png';
      this.storage.set('yourAvatar', this.yourAvatar);
    } else {
      this.yourAvatar = 'assets/img/avatar-' + this.yourGender + '.png';
      this.storage.set('yourAvatar', this.yourAvatar);
    }

    this.configServ.setUserName(this.yourName);
    this.configServ.setUserGender(this.yourGender);
    this.configServ.setUserAvatar(this.yourAvatar);
    
    this.dismiss();
    this.appCtrl.getRootNav().setRoot(HomePage);
  }  
}
