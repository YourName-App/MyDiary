import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeAudio } from 'ionic-native';
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
  userPin: string;
  pauseEmitted: boolean;
  musicPlayed: boolean;

  constructor(private navCtrl: NavController, private storage: Storage,
    private configServ: ConfigService) {

    NativeAudio.preloadComplex('sparkle', 'assets/audio/Sparkle.mp3', 1, 1, 0);

    setTimeout(() => {
      this.userName = this.configServ.getUserName();
      this.userGender = this.configServ.getUserGender();
      this.userAvatar = this.configServ.getUserAvatar();
      this.userPin = this.configServ.getUserPin();
      this.pauseEmitted = this.configServ.getPauseEmitted();
    }, 1000);
  }

  ionViewWillEnter() {
    setTimeout(() => {
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

  playMusic() {
    this.musicPlayed = true;
    NativeAudio.loop('sparkle');
  }

  stopMusic() {
    this.musicPlayed = false;
    NativeAudio.stop('sparkle');
  }
}
