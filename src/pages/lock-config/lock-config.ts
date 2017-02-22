import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PinDialog } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-lock-config',
  templateUrl: 'lock-config.html'
})
export class LockConfigPage {

  theme: string;
  userPin: string;
  enableLock: boolean;

  constructor(private navCtrl: NavController, private configServ: ConfigService,
    private alertCtrl: AlertController, private storage: Storage) {}

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
    this.userPin = this.configServ.getUserPin();
    this.enableLock = this.userPin.length >= 4;
  }

  addPassword() {
    PinDialog.prompt('請輸入至少4個數字的密碼', '開啟密碼', ['確認', '取消'])
    .then((result: any) => {
      if (result.buttonIndex === 1) {
        if (result.input1 !== null && result.input1.trim().length >= 4) {
          this.confirmPassword(result.input1);
        } else {
          this.alertMessage('請輸入至少4個數字的密碼。');
        }
      }
    });
  }

  confirmPassword(password: string) {
    PinDialog.prompt('請重複輸入密碼', '開啟密碼', ['確認', '取消'])
    .then((result: any) => {
      if (result.buttonIndex === 1) {
        if (result.input1 === password) {
          this.storage.set('userPin', result.input1);
          this.userPin = result.input1;
          this.configServ.setUserPin(result.input1);
          this.configServ.setPauseEmitted(true);
          this.enableLock = !this.enableLock;
        } else {
          this.alertMessage('密碼不符，請重新設定。');
        }
      }
    });
  }

  removePassword() {
    PinDialog.prompt('請輸入密碼', '關閉密碼', ['確認', '取消'])
    .then((result: any) => {
      if (result.input1 === this.configServ.getUserPin()) {
        this.storage.set('userPin', '');
        this.userPin = '';
        this.configServ.setUserPin('');
        this.configServ.setPauseEmitted(false);
        this.enableLock = !this.enableLock;
      } else {
        this.alertMessage('密碼錯誤。');
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
