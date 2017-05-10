import { Component } from '@angular/core';
import { NavController, App, ToastController } from 'ionic-angular';
import { PinDialog } from '@ionic-native/pin-dialog';
import { Storage } from '@ionic/storage';
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
    private configServ: ConfigService, private toastCtrl: ToastController,
    private storage: Storage, private localeServ:LocaleService,
    private pinDialog: PinDialog) {

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
    this.pinDialog.prompt(this.addPinPromptMsg, this.addPinTitle, [this.addPinConfirmBtn, this.addPinCancelBtn])
    .then((result: any) => {
      if (result.buttonIndex === 1) {
        if (result.input1 !== null && result.input1.trim().length >= 4) {
          this.confirmPin(result.input1);
        } else {
          this.toastMessage(this.addPinPromptMsg);  // 請輸入至少4個數字的密碼
        }
      }
    });
  }

  ConfirmPinPromptMsg:string;
  ConfirmPinTitle:string;
  ConfirmPinConfirmBtn:string;
  ConfirmPinCancelBtn:string;
  ConfirmPinDoneMsg:string;
  ConfirmPinAlertMsg:string;

  confirmPin(pin: string) {
    //PinDialog.prompt('請重複輸入密碼', '確認密碼', ['確認', '取消'])
    this.pinDialog.prompt(this.ConfirmPinPromptMsg, this.ConfirmPinTitle, [this.ConfirmPinConfirmBtn, this.ConfirmPinCancelBtn])
    .then((result: any) => {
      if (result.buttonIndex === 1) {
        if (result.input1 === pin) {
          this.userPin = result.input1;
          this.storage.set('userPin', this.userPin);
          this.configServ.setUserPin(this.userPin);
          this.configServ.setPauseEmitted('N');
          this.enableLock = !this.enableLock;
          this.toastMessage(this.ConfirmPinDoneMsg);      // 密碼鎖已開啟
        } else {
          this.toastMessage(this.ConfirmPinAlertMsg);   // 密碼不一致，請重新設定
        }
      }
    });
  }

  RemovePinPromptMsg:string;
  RemovePinTitle:string;
  RemovePinConfirmBtn:string;
  RemovePinCancelBtn:string;
  RemovePinDoneMsg:string;
  RemovePinAlertMsg:string;

  removePin() {
    //PinDialog.prompt('請輸入密碼', '關閉密碼', ['確認', '取消'])
    this.pinDialog.prompt(this.RemovePinPromptMsg,this.RemovePinTitle, [this.RemovePinConfirmBtn, this.RemovePinCancelBtn])
    .then((result: any) => {
      if (result.input1 === this.configServ.getUserPin()) {
        this.storage.set('userPin', '');
        this.userPin = '';
        this.configServ.setUserPin('');
        this.configServ.setPauseEmitted('N');
        this.enableLock = !this.enableLock;
        this.toastMessage(this.RemovePinDoneMsg);    // 密碼鎖已關閉
      } else {
        this.toastMessage(this.RemovePinAlertMsg);   // 密碼錯誤
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

  private subscribeLocaleUpdate() {
    this.localeServ.subscribe('PIN_CONFIG_PAGE.ADD_PIN_PROMPT_MSG',    (value:string) => { this.addPinPromptMsg  = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.ADD_PIN_TITLE',         (value:string) => { this.addPinTitle      = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.ADD_PIN_CONFIRM_BTN',   (value:string) => { this.addPinConfirmBtn = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.ADD_PIN_CANCEL_BTN',    (value:string) => { this.addPinCancelBtn  = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.ADD_PIN_ALERT_MSG',     (value:string) => { this.addPinAlertMsg   = value; });

    this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_PROMPT_MSG', (value:string) => { this.ConfirmPinPromptMsg  = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_TITLE',      (value:string) => { this.ConfirmPinTitle      = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_CONFIRM_BTN',(value:string) => { this.ConfirmPinConfirmBtn = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_CANCEL_BTN', (value:string) => { this.ConfirmPinCancelBtn  = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_DONE_MSG',   (value:string) => { this.ConfirmPinDoneMsg    = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_ALERT_MSG',  (value:string) => { this.ConfirmPinAlertMsg   = value; });

    this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_PROMPT_MSG', (value:string) => { this.RemovePinPromptMsg  = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_TITLE',      (value:string) => { this.RemovePinTitle      = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_CONFIRM_BTN',(value:string) => { this.RemovePinConfirmBtn = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_CANCEL_BTN', (value:string) => { this.RemovePinCancelBtn  = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_DONE_MSG',   (value:string) => { this.RemovePinDoneMsg    = value; });
    this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_ALERT_MSG',  (value:string) => { this.RemovePinAlertMsg   = value; });

  }
}
