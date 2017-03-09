import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';

@Component({
  selector: 'page-user-config',
  templateUrl: 'user-config.html'
})
export class UserConfigPage {

  theme: string;
  userName: string;
  userGender: string;
  userAvatar: string;

  constructor(private navCtrl: NavController, private appCtrl: App,
    private storage: Storage, private configServ: ConfigService, private localeServ: LocaleService) {
  }

  ionViewWillEnter() {
    this.userName = this.configServ.getUserName();

    if (this.userName === null || this.userName.trim().length === 0) {
      this.localeServ.subscribe('YOUR_NAME', (value:string) => { this.userName = value; })
    }

    this.userGender = this.configServ.getUserGender();
    this.theme = this.userGender;
  }

  updateSettings() {
    let prompt:string;
    this.localeServ.localize('YOUR_NAME', (value:string) => { prompt = value; });

    this.userName = (this.userName === null || this.userName.trim().length === 0) ? prompt : this.userName;  // 你的名字是？
    this.userGender = (this.userGender === null || this.userGender.trim().length === 0) ? 'male' : this.userGender;
    this.userAvatar = 'assets/img/avatar-' + this.userGender + '.png';

    this.storage.set('userName', this.userName);
    this.storage.set('userGender', this.userGender);
    this.storage.set('userAvatar', this.userAvatar);

    this.configServ.setUserName(this.userName);
    this.configServ.setUserGender(this.userGender);
    this.configServ.setUserAvatar(this.userAvatar);

    this.navCtrl.pop();
  }
}
