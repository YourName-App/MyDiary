import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { PinDialog } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';

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
    private storage: Storage,
    private localeServ:LocaleService) {

    this.subscribeLocaleUpdate();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
    this.userPin = this.configServ.getUserPin();
    this.enableLock = this.userPin.length >= 4;
  }

  addPinPromptMsg:string;
  addPinTitle:string;
  addPinConfirmBtn:string;
  addPinCancelBtn:string;
  addPinAlertMsg:string;

  addPin() {
  //PinDialog.prompt('請輸入至少4個數字的密碼', '設定密碼', ['確認', '取消'])
    PinDialog.prompt(this.addPinPromptMsg, this.addPinTitle, [this.addPinConfirmBtn, this.addPinCancelBtn])
    .then((result: any) => {
      if (result.buttonIndex === 1) {
        if (result.input1 !== null && result.input1.trim().length >= 4) {
          this.confirmPin(result.input1);
        } else {
          this.alertMessage(this.addPinAlertMsg);
        }
      }
    });
  }

  ConfirmPinPromptMsg:string;
  ConfirmPinTitle:string;
  ConfirmPinConfirmBtn:string;
  ConfirmPinCancelBtn:string;
  ConfirmPinAlertMsg:string;

  confirmPin(pin: string) {
  //PinDialog.prompt('請重複輸入密碼', '確認密碼', ['確認', '取消'])
    PinDialog.prompt(this.ConfirmPinPromptMsg, this.ConfirmPinTitle, [this.ConfirmPinConfirmBtn, this.ConfirmPinCancelBtn])
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
          this.alertMessage(this.ConfirmPinAlertMsg);
        }
      }
    });
  }

  RemovePinPromptMsg:string;
  RemovePinTitle:string;
  RemovePinConfirmBtn:string;
  RemovePinCancelBtn:string;
  RemovePinAlertMsg:string;

  removePin() {
  //PinDialog.prompt('請輸入密碼', '關閉密碼', ['確認', '取消'])
    PinDialog.prompt(this.RemovePinPromptMsg,this.RemovePinTitle, [this.RemovePinConfirmBtn, this.RemovePinCancelBtn])
    .then((result: any) => {
      if (result.input1 === this.configServ.getUserPin()) {
        this.storage.set('userPin', '');
        this.userPin = '';
        this.configServ.setUserPin('');
        this.configServ.setPauseEmitted('N');
        this.enableLock = !this.enableLock;
        this.appCtrl.getRootNav().setRoot(HomePage);
      } else {
        this.alertMessage(this.RemovePinAlertMsg);
      }
    });
  }

  alertMsgBtn:string;

  alertMessage(msg: string) {
    let alert = this.alertCtrl.create({
      message: msg,
      buttons: [{
      //text: '確認',
        text: this.alertCtrl,
        role: 'cancel'
      }]
    });
  
    alert.present();
  }

  private subscribeLocaleUpdate() {
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.ADD_PIN_PROMPT_MSG',  (componet:any, value:string) => { this.addPinPromptMsg  = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.ADD_PIN_TITLE',       (componet:any, value:string) => { this.addPinTitle      = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.ADD_PIN_CONFIRM_BTN', (componet:any, value:string) => { this.addPinConfirmBtn = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.ADD_PIN_CANCEL_BTN',  (componet:any, value:string) => { this.addPinCancelBtn  = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.ADD_PIN_ALERT_MSG',   (componet:any, value:string) => { this.addPinAlertMsg   = value; });

    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.CONFIRM_PIN_PROMPT_MSG', (componet:any, value:string) => { this.ConfirmPinPromptMsg  = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.CONFIRM_PIN_TITLE',      (componet:any, value:string) => { this.ConfirmPinTitle      = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.CONFIRM_PIN_CONFIRM_BTN',(componet:any, value:string) => { this.ConfirmPinConfirmBtn = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.CONFIRM_PIN_CANCEL_BTN', (componet:any, value:string) => { this.ConfirmPinCancelBtn  = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.CONFIRM_PIN_ALERT_MSG',  (componet:any, value:string) => { this.ConfirmPinAlertMsg   = value; });

    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.REMOVE_PIN_PROMPT_MSG', (componet:any, value:string) => { this.RemovePinPromptMsg  = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.REMOVE_PIN_TITLE',      (componet:any, value:string) => { this.RemovePinTitle      = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.REMOVE_PIN_CONFIRM_BTN',(componet:any, value:string) => { this.RemovePinConfirmBtn = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.REMOVE_PIN_CANCEL_BTN', (componet:any, value:string) => { this.RemovePinCancelBtn  = value; });
    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.REMOVE_PIN_ALERT_MSG',  (componet:any, value:string) => { this.RemovePinAlertMsg   = value; });

    this.localeServ.subscribe(this, 'PIN_CONFIG_PAGE.ALERT_MSG_BTN', (componet:any, value:string) => { this.alertMsgBtn   = value; });
  }
}
