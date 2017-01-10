import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  yourName: string;
  yourGender: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public storage: Storage) {

    // Get user name
    storage.get('yourName').then((val) => {
      this.yourName = val;
    }, (error) => {
      console.log(error);
    })

    // Get user gender
    storage.get('yourGender').then((val) => {
      this.yourGender = val;
    }, (error) => {
      console.log(error);
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateSetting() {
    this.storage.set('yourName', this.yourName);
    this.storage.set('yourGender', this.yourGender);
    this.dismiss();
  }  
}
