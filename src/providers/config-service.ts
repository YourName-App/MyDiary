import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { PinDialog } from 'ionic-native';

@Injectable()
export class ConfigService {

  userName: string = '';
  userGender: string = '';
  userAvatar: string = '';
  userPin: string = '';
  pauseEmitted: string = 'Y';
  musicPlayed: boolean = false;

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.fetchUserName();
    this.fetchUserGender();
    this.fetchUserAvatar();
    this.fetchUserPin();
  }

  fetchUserName(): Promise<string> {
    return this.storage.get('userName')
      .then(val => {
        this.userName = (val != null && val.trim().length != 0) ? val : '你的名字是？';
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
            this.toastMessage('成功解除密碼鎖');
            this.setPauseEmitted('N');
            canEnter = true;
          } else {
            this.toastMessage('密碼錯誤');
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
