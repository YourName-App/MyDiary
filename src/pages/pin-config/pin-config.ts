import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { PinDialog } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-pin-config',
  templateUrl: 'pin-config.html'
})
export class PinConfigPage {

  theme: string;
  userPin: string;
  enableLock: boolean;

  constructor(private navCtrl: NavController, private appCtrl: App,
    private configServ: ConfigService, private alertCtrl: AlertController,
    private storage: Storage) {}

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
    this.userPin = this.configServ.getUserPin();
    this.enableLock = this.userPin.length >= 4;
  }

  addPin() {
    PinDialog.prompt('請輸入至少4個數字的密碼', '設定密碼', ['確認', '取消'])
    .then((result: any) => {
      if (result.buttonIndex === 1) {
        if (result.input1 !== null && result.input1.trim().length >= 4) {
          this.confirmPin(result.input1);
        } else {
          this.alertMessage('請輸入至少4個數字的密碼');
        }
      }
    });
  }

  confirmPin(pin: string) {
    PinDialog.prompt('請重複輸入密碼', '確認密碼', ['確認', '取消'])
    .then((result: any) => {
      if (result.buttonIndex === 1) {
        if (result.input1 === pin) {
          this.storage.set('userPin', result.input1);
          this.userPin = result.input1;
          this.configServ.setUserPin(result.input1);
          this.configServ.setPauseEmitted('Y');
          this.enableLock = !this.enableLock;
          this.appCtrl.getRootNav().setRoot(HomePage);
        } else {
          this.alertMessage('密碼不一致，請重新設定');
        }
      }
    });
  }

  removePin() {
    PinDialog.prompt('請輸入密碼', '關閉密碼', ['確認', '取消'])
    .then((result: any) => {
      if (result.input1 === this.configServ.getUserPin()) {
        this.storage.set('userPin', '');
        this.userPin = '';
        this.configServ.setUserPin('');
        this.configServ.setPauseEmitted('N');
        this.enableLock = !this.enableLock;
        this.appCtrl.getRootNav().setRoot(HomePage);
      } else {
        this.alertMessage('密碼錯誤');
      }
    });
  }

  alertMessage(msg: string) {
    let alert = this.alertCtrl.create({
      message: msg,
      buttons: [{
        text: '確認',
        role: 'cancel'
      }]
    });
  
    alert.present();
  }
}
