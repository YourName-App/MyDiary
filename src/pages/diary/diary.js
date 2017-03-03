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
import { NavController, ModalController } from 'ionic-angular';
import { DiaryEditPage } from '../diary-edit/diary-edit';
import { DiaryService } from '../../providers/diary-service';
import { ConfigService } from '../../providers/config-service';
var DiaryPage = (function () {
    function DiaryPage(navCtrl, modalCtrl, diaryServ, configServ) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.diaryServ = diaryServ;
        this.configServ = configServ;
        this.segment = 'diary-list';
        this.initializeDiary();
    }
    DiaryPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    DiaryPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    DiaryPage.prototype.initializeDiary = function () {
        this.diaryList = this.diaryServ.getDiaryList();
    };
    DiaryPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    DiaryPage.prototype.createDiary = function () {
        this.modalCtrl.create(DiaryEditPage).present();
    };
    DiaryPage.prototype.searchDiary = function (ev) {
        this.initializeDiary();
        var targetVal = ev.target.value;
        if (targetVal && targetVal.trim() != '') {
            this.diaryList = this.diaryList.map(function (diaries) {
                var result = diaries.filter(function (diary) { return diary.title.toLowerCase().indexOf(targetVal.toLowerCase()) > -1 ||
                    diary.content.toLowerCase().indexOf(targetVal.toLowerCase()) > -1 ||
                    diary.timestamp.substring(0, 4) === targetVal ||
                    diary.timestamp.substring(0, 7) === targetVal ||
                    diary.timestamp.substring(0, 10) === targetVal; });
                return result;
            });
        }
    };
    return DiaryPage;
}());
DiaryPage = __decorate([
    Component({
        selector: 'page-diary',
        templateUrl: 'diary.html'
    }),
    __metadata("design:paramtypes", [NavController, ModalController,
        DiaryService, ConfigService])
], DiaryPage);
export { DiaryPage };
//# sourceMappingURL=diary.js.map