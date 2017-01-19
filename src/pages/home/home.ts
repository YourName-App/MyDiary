import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DiaryPage } from '../../pages/diary/diary';
import { ContactListPage } from '../../pages/contact-list/contact-list';
import { MemoListPage } from '../../pages/memo-list/memo-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  yourName: string;
  yourGender: string;
  yourAvatar: string;


  constructor(public navCtrl: NavController, public menu: MenuController,
    public storage: Storage) {

    this.menu.swipeEnable(true);
  }

  ionViewWillEnter() {
    this.storage.get('yourName').then((val) => {
      if (val === null || val.trim().length === 0) {
        val = '你的名字是？';
      }

      this.yourName = val;
    }, (error) => {
      console.log(error);
    })

    this.storage.get('yourGender').then((val) => {
      if (val === null || val.trim().length === 0) {
        val = 'male';
      }

      this.yourGender = val;
    }, (error) => {
      console.log(error);
    })

    this.storage.get('yourAvatar').then((val) => {
      if (val === null || val.trim().length === 0) {
        val = 'assets/img/avatar-male.png';
      }

      this.yourAvatar = val;
    }, (error) => {
      console.log(error);
    })
  }

  selectTab(tabIndex: number) {
    this.navCtrl.parent.select(tabIndex);
  }

  goToDiary() {
    this.navCtrl.push(DiaryPage);
  }

  goToContact() {
    this.navCtrl.push(ContactListPage);
  }

  goToMemo() {
    this.navCtrl.push(MemoListPage);
  }
}
