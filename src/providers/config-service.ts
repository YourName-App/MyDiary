import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  userName: string = '';
  userGender: string = '';
  userAvatar: string = '';


  constructor() {}

  getUserName() {
    return this.userName || '你的名字是？';
  }

  getUserGender(): string {
    return this.userGender || 'male';
  }

  getUserAvatar(): string {
    return this.userAvatar || 'assets/img/avatar-male.png';
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
}
