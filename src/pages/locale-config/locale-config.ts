import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';

@Component({
  selector: 'page-locale-config',
  templateUrl: 'locale-config.html'
})
export class LocaleConfigPage {

  theme: string;
  userGender: string;
  userLocale: string;

  constructor(private navCtrl: NavController, private storage: Storage,
    private configServ: ConfigService, private localeServ: LocaleService) {
  }

  ionViewWillEnter() {
    this.userLocale = this.localeServ.getUserLocale();
    this.userGender = this.configServ.getUserGender();
    this.theme = this.userGender;
  }

  // To change the language the app is currently using
  updateLocale() {
    this.userLocale = (this.userLocale === null || this.userLocale.trim().length === 0) ? 'en' : this.userLocale.trim();
    this.storage.set('userLocale', this.userLocale);
    this.localeServ.setUserLocale(this.userLocale);
    this.localeServ.use(this.userLocale);
    this.localeServ.updatePageLocale();

    this.navCtrl.setRoot(HomePage);
  }
}
