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

    if (this.getPauseEmitted() === 'Y' && this.getUserPin().length >= 4) {
      PinDialog.prompt('請輸入密碼', '解除密碼鎖', ['確認', '取消'])
      .then((result: any) => {
        if (result.buttonIndex === 1) {
          if (result.input1 === this.getUserPin()) {
            this.alertMessage('成功解除密碼鎖');
            this.setPauseEmitted('N');
            canEnter = true;
          } else {
            this.alertMessage('密碼錯誤');
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
