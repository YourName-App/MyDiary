import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DiaryPage } from '../../pages/diary/diary';
import { ContactListPage } from '../../pages/contact-list/contact-list';
import { MemoListPage } from '../../pages/memo-list/memo-list';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  theme: string;
  userName: string;
  userGender: string;
  userAvatar: string;


  constructor(private navCtrl: NavController, private storage: Storage,
    private configServ: ConfigService) {

    
    setTimeout(()=> {
      this.userName = this.configServ.getUserName();
      this.userGender = this.configServ.getUserGender();
      this.userAvatar = this.configServ.getUserAvatar();
    }, 100);
    /*
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

    setTimeout(()=> {
      this.configServ.setUserName(this.userName); 
      this.configServ.setUserGender(this.userGender);
      this.configServ.setUserAvatar(this.userAvatar);
    }, 150);
    */
  }

  ionViewWillEnter() {
    setTimeout(()=> {
      this.theme = this.configServ.getUserGender();
    }, 150);
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
