import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { SettingService } from '../../providers/setting-service';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  public yourName: string;
  public yourGender: string;

  constructor(public navCtrl: NavController, public settingServ: SettingService,
    public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createSetting() {
    /*
    this.settingServ.createSetting(this.yourName || '你的名字', this.yourGender || 'male').then((user) => {
      this.dismiss();
    }, (error) => {
      console.log(error);
    });
    */
  }  
}
