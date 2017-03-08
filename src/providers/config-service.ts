import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { PinDialog } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
import { LocaleService } from '../providers/locale-service';

@Injectable()
export class ConfigService {

  userName    : string = '';
  userGender  : string = '';
  userAvatar  : string = '';
  userPin     : string = '';
  pauseEmitted: string = 'Y';
  musicPlayed : boolean = false;

  constructor(private storage: Storage, private alertCtrl: AlertController,
    private translate: TranslateService,
    private localServ: LocaleService) {

    this.storage.get('userName').then((val) => {
      if (val === null || val.trim().length === 0) {
        // val = '你的名字是？';
        // apply prompt message by locale
        localServ.localize('YOUR_NAME', (value:string) => { val = value; });
      }
      this.userName = val;
    }, (error) => {
      console.log(error);
    })

    this.storage.get('userGender').then((val) => {
      if (val === null || val.trim().length === 0) {
        val = 'male';
      }
      this.userGender = val;
    }, (error) => {
      console.log(error);
    })

    this.storage.get('userAvatar').then((val) => {
      if (val === null || val.trim().length === 0) {
        val = 'assets/img/avatar-male.png';
      }
      this.userAvatar = val;
    }, (error) => {
      console.log(error);
    })

    this.storage.get('userPin').then((val) => {
      if (val === null || val.trim().length < 4) {
        val = '';
      }
      this.userPin = val;
    }, (error) => {
      console.log(error);
    })
  }

  getUserName() {
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

    this.localServ.localize('CONFIG_SERV.MESSAGE',            (value:string) => { message      = value; });
    this.localServ.localize('CONFIG_SERV.TITLE',              (value:string) => { title        = value; });
    this.localServ.localize('CONFIG_SERV.BTN_CONFIRM',        (value:string) => { btnConfirm   = value; });
    this.localServ.localize('CONFIG_SERV.BTN_CANCEL',         (value:string) => { btnCancel    = value; });
    this.localServ.localize('CONFIG_SERV.ALERT_MSG_SUCCESS',  (value:string) => { alertMessageSuccess = value; });
    this.localServ.localize('CONFIG_SERV.ALERT_MSG_ERROR',    (value:string) => { alertMessageError   = value; });

    if (this.getPauseEmitted() === 'Y' && this.getUserPin().length >= 4) {
      PinDialog.prompt(message, title, [btnConfirm, btnCancel])
      .then((result: any) => {
        if (result.buttonIndex === 1) {
          if (result.input1 === this.getUserPin()) {
            this.alertMessage(alertMessageSuccess);
            this.setPauseEmitted('N');
            canEnter = true;
          } else {
            this.alertMessage(alertMessageError);
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

  private alertMessage(msg: string) {
    let options =
    {
      message: msg,
      buttons: [{
        text: '',           // 確認
        role: 'cancel'
      }]
    };
    this.localServ.localize('CONFIG_SERV.BTN_ALERT', (value:string) => { options.buttons[0].text = value; });
    let alert = this.alertCtrl.create(options);
    alert.present();
  }
}
