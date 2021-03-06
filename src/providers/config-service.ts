import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { PinDialog } from 'ionic-native';
import { LocaleService } from '../providers/locale-service';

@Injectable()
export class ConfigService {

  userName    : string = '';
  userGender  : string = '';
  userAvatar  : string = '';
  userPin     : string = '';
  pauseEmitted: string = 'Y';
  musicPlayed : boolean = false;

  constructor(private storage: Storage, private toastCtrl: ToastController, private localeServ: LocaleService) {
    this.fetchUserName();
    this.fetchUserGender();
    this.fetchUserAvatar();
    this.fetchUserPin();
  }

  fetchUserName(): Promise<string> {
    let prompt:string;
    this.localeServ.localize('YOUR_NAME', (value:string) => { prompt = value; });

    return this.storage.get('userName')
      .then(val => {
        this.userName = (val != null && val.trim().length != 0) ? val : prompt;
        return this.userName;
      })
      .catch(error => {
        console.log(error);
      })
  }

  fetchUserGender(): Promise<string> {
    return this.storage.get('userGender')
      .then(val => {
        this.userGender = (val != null && val.trim().length != 0) ? val : 'male';
        return this.userGender;
      })
      .catch(error => {
        console.log(error);
      })
  }

  fetchUserAvatar(): Promise<string> {
    return this.storage.get('userAvatar')
      .then(val => {
        this.userAvatar = (val != null && val.trim().length != 0) ? val : 'assets/img/avatar-male.png';
        return this.userAvatar;
      })
      .catch(error => {
        console.log(error);
      })
  }

  fetchUserPin(): Promise<string> {
    return this.storage.get('userPin')
      .then(val => {
        this.userPin = (val != null && val.trim().length >= 4) ? val : '';
        return this.userPin;
      })
      .catch(error => {
        console.log(error);
      })
  }

  getUserName():string {
    return this.userName;
  }

  getUserGender(): string {
    return this.userGender;
  }

  getUserAvatar(): string {
    return this.userAvatar;
  }

  getUserPin(): string {
    return this.userPin;
  }

  getPauseEmitted(): string {
    return this.pauseEmitted;
  }

  getMusicPlayed(): boolean {
    return this.musicPlayed;
  }

  setUserName(name: string) {
    this.userName = name;
  }

  setUserGender(gender: string) {
    this.userGender = gender;
  }

  setUserAvatar(avatar: string) {
    this.userAvatar = avatar;
  }

  setUserPin(pin: string) {
    this.userPin = pin;
  }

  setPauseEmitted(pauseEmitted: string) {
    this.pauseEmitted = pauseEmitted;
  }

  setMusicPlayed(musicPlayed: boolean) {
    this.musicPlayed = musicPlayed;
  }

  unlockScreen(): boolean {
    let canEnter: boolean = false;
    let message             :string;    // 請輸入密碼
    let title               :string;    // 解除密碼鎖
    let btnConfirm          :string;    // 確認
    let btnCancel           :string;    // 取消
    let alertMessageSuccess :string;    // 成功解除密碼鎖
    let alertMessageError   :string;    // 密碼錯誤

    this.localeServ.localize('CONFIG_SERV.MESSAGE',            (value:string) => { message      = value; });
    this.localeServ.localize('CONFIG_SERV.TITLE',              (value:string) => { title        = value; });
    this.localeServ.localize('CONFIG_SERV.BTN_CONFIRM',        (value:string) => { btnConfirm   = value; });
    this.localeServ.localize('CONFIG_SERV.BTN_CANCEL',         (value:string) => { btnCancel    = value; });
    this.localeServ.localize('CONFIG_SERV.ALERT_MSG_SUCCESS',  (value:string) => { alertMessageSuccess = value; });
    this.localeServ.localize('CONFIG_SERV.ALERT_MSG_ERROR',    (value:string) => { alertMessageError   = value; });

    if (this.getPauseEmitted() === 'Y' && this.getUserPin().length >= 4) {
      PinDialog.prompt(message, title, [btnConfirm, btnCancel])
      .then((result: any) => {
        if (result.buttonIndex === 1) {
          if (result.input1 === this.getUserPin()) {
            this.toastMessage(alertMessageSuccess);
            this.setPauseEmitted('N');
            canEnter = true;
          } else {
            this.toastMessage(alertMessageError);
            canEnter = false;
          }
        } else {
          canEnter = false;
        }
      });
    } else {
      canEnter = true;
    }
    return canEnter;
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
