import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'page-user-config',
  templateUrl: 'user-config.html'
})
export class UserConfigPage {

  theme: string;
  userName: string;
  userGender: string;
  userAvatar: string;
  userLocale: string;

  constructor(private navCtrl: NavController, private appCtrl: App,
    private storage: Storage, private configServ: ConfigService, public translate: TranslateService, public localeServ:LocaleService) {

    this.userName = this.configServ.getUserName();
    if (this.userName === null || this.userName.trim().length === 0) {
      this.translate.get('YOUR_NAME').subscribe((value: string) => {
            this.userName = value;
        });
    }
    this.userGender = this.configServ.getUserGender();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }

  updateSetting() {
    if (this.userName === null || this.userName.trim().length === 0) {
    //this.userName = '你的名字是？';
      this.translate.get('YOUR_NAME').subscribe((value: string) => {
            this.userName = value;
        });
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

    this.updateLocale();

    this.navCtrl.pop();
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

  // To change the language the app is currently using
  updateLocale() {
    this.translate.use(this.userLocale.trim());
    this.localeServ.updatePageLocale();
  }
}
