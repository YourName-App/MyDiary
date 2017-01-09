import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SettingService } from '../../providers/setting-service';
import { TabsPage } from '../tabs/tabs';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  public settingList: any;
  public yourName: string;
  public yourGender: string;

  constructor(public navCtrl: NavController, public settingServ: SettingService,
    public viewCtrl: ViewController) {

    this.settingList = this.settingServ.getSettingList();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createSetting() {
    this.settingServ.createSetting(this.yourName || '你的名字', this.yourGender || 'male').then( user => {
      this.dismiss();
    }, error => {
      console.log(error);
    });
  }  
}
