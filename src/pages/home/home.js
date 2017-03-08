var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeAudio } from 'ionic-native';
import { DiaryPage } from '../../pages/diary/diary';
import { ContactListPage } from '../../pages/contact-list/contact-list';
import { MemoListPage } from '../../pages/memo-list/memo-list';
import { ConfigService } from '../../providers/config-service';
var HomePage = (function () {
    function HomePage(navCtrl, configServ) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.configServ = configServ;
        NativeAudio.preloadComplex('sparkle', 'assets/audio/sparkle-piano.mp3', 1, 1, 0).then(function () { console.log('Preload audio'); }, function (err) { console.log(err); });
        setTimeout(function () {
            _this.userName = _this.configServ.getUserName();
            _this.userGender = _this.configServ.getUserGender();
            _this.userAvatar = _this.configServ.getUserAvatar();
            _this.userPin = _this.configServ.getUserPin();
            _this.pauseEmitted = _this.configServ.getPauseEmitted();
            _this.musicPlayed = _this.configServ.getMusicPlayed();
        }, 1000);
    }
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.theme = _this.configServ.getUserGender();
        }, 150);
    };
    HomePage.prototype.selectTab = function (tabIndex) {
        this.navCtrl.parent.select(tabIndex);
    };
    HomePage.prototype.goToDiary = function () {
        this.navCtrl.push(DiaryPage);
    };
    HomePage.prototype.goToContact = function () {
        this.navCtrl.push(ContactListPage);
    };
    HomePage.prototype.goToMemo = function () {
        this.navCtrl.push(MemoListPage);
    };
    HomePage.prototype.playMusic = function () {
        this.musicPlayed = true;
        this.configServ.setMusicPlayed(this.musicPlayed);
        NativeAudio.loop('sparkle').then(function () { console.log('Play audio'); }, function (err) { console.log(err); });
    };
    HomePage.prototype.stopMusic = function () {
        this.musicPlayed = false;
        this.configServ.setMusicPlayed(this.musicPlayed);
        NativeAudio.stop('sparkle').then(function () { console.log('Stop audio'); }, function (err) { console.log(err); });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, ConfigService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map