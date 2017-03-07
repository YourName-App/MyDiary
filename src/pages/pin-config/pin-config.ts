import { Component } from '@angular/core';
import { NavController, App, ToastController } from 'ionic-angular';
import { PinDialog } from 'ionic-native';
import { Storage } from '@ionic/storage';
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
    private configServ: ConfigService, private toastCtrl: ToastController,
    private storage: Storage) {}

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
    this.userPin = this.configServ.getUserPin();
    this.enableLock = this.userPin.length >= 4;
  }

  addPin() {
    PinDialog.prompt('請輸入長度至少為 4 個數字的密碼', '開啟密碼鎖', ['確認', '取消'])
    .then((result: any) => {
      if (result.buttonIndex === 1) {
        if (result.input1 !== null && result.input1.trim().length >= 4) {
          this.confirmPin(result.input1);
        } else {
          this.toastMessage('請輸入長度至少為 4 個數字的密碼');
        }
      }
    });
  }

  confirmPin(pin: string) {
    PinDialog.prompt('驗證密碼', '開啟密碼鎖', ['確認', '取消'])
    .then((result: any) => {
      if (result.buttonIndex === 1) {
        if (result.input1 === pin) {
          this.userPin = result.input1;
          this.storage.set('userPin', this.userPin);
          this.configServ.setUserPin(this.userPin);
          this.configServ.setPauseEmitted('N');
          this.enableLock = !this.enableLock;
          this.toastMessage('密碼鎖已開啟');
        } else {
          this.toastMessage('密碼不一致，請重新設定');
        }
      }
    });
  }

  removePin() {
    PinDialog.prompt('請輸入密碼', '關閉密碼鎖', ['確認', '取消'])
    .then((result: any) => {
      if (result.input1 === this.configServ.getUserPin()) {
        this.storage.set('userPin', '');
        this.userPin = '';
        this.configServ.setUserPin('');
        this.configServ.setPauseEmitted('N');
        this.enableLock = !this.enableLock;
        this.toastMessage('密碼鎖已關閉');
      } else {
        this.toastMessage('密碼錯誤');
      }
    });
  }

  private toastMessage(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      dismissOnPageChange: true
    });
  
    toast.present();
  }
}
