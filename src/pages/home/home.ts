import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { DiaryPage } from '../../pages/diary/diary';
import { ContactListPage } from '../../pages/contact-list/contact-list';
import { MemoListPage } from '../../pages/memo-list/memo-list';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  theme: string;
  userName: string;
  userGender: string;
  userAvatar: string;
  userPin: string;
  pauseEmitted: string;
  musicPlayed: boolean;

  constructor(private navCtrl: NavController, private configServ: ConfigService,
    private nativeAudio: NativeAudio)  {
    this.preloadMusic();
  }

  ngOnInit() {  
    this.configServ.fetchUserName().then(userName => {
      this.userName = userName;
    });

    this.configServ.fetchUserGender().then(userGender => {
      this.userGender = userGender;
    });

    this.configServ.fetchUserAvatar().then(userAvatar => {
      this.userAvatar = userAvatar;
    });

    this.configServ.fetchUserPin().then(userPin => {
      this.userPin = userPin;
    });

    this.pauseEmitted = this.configServ.getPauseEmitted();
    this.musicPlayed = this.configServ.getMusicPlayed();
  }

  ionViewWillEnter() {
    this.userName = this.configServ.getUserName();
    this.userGender = this.configServ.getUserGender();
    this.userAvatar = this.configServ.getUserAvatar();
    this.userPin = this.configServ.getUserPin();
    this.theme = this.configServ.getUserGender();
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

  preloadMusic() {
    this.nativeAudio.preloadComplex('sparkle', 'assets/audio/sparkle-piano.mp3', 1, 1, 0).then(
      () => {console.log('Preload audio');},
      (err) => {console.log(err);}
    );
  }

  playMusic() {
    this.musicPlayed = true;
    this.configServ.setMusicPlayed(this.musicPlayed);
    this.nativeAudio.loop('sparkle').then(
      () => {console.log('Play audio');},
      (err) => {console.log(err);}
    );
  }

  stopMusic() {
    this.musicPlayed = false;
    this.configServ.setMusicPlayed(this.musicPlayed);
    this.nativeAudio.stop('sparkle').then(
      () => {console.log('Stop audio');},
      (err) => {console.log(err);}
    );
  }
}
