import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigService {

  userName: string = '';
  userGender: string = '';
  userAvatar: string = '';
  userPin: string = '';
  pauseEmitted: boolean = true;

  constructor(private storage: Storage) {
    this.storage.get('userName').then((val) => {
      if (val === null || val.trim().length === 0) {
        val = '你的名字是？';
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

  getPauseEmitted(): boolean {
    return this.pauseEmitted;
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

  setPauseEmitted(pauseEmitted: boolean) {
    this.pauseEmitted = pauseEmitted;
  }
}
