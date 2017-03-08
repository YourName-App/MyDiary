var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { DiaryEditPage } from '../diary-edit/diary-edit';
import { DiaryService } from '../../providers/diary-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
var DiaryDetailPage = (function () {
    function DiaryDetailPage(navParams, viewCtrl, alertCtrl, modalCtrl, diaryServ, configServ, element, localeServ) {
        var _this = this;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.diaryServ = diaryServ;
        this.configServ = configServ;
        this.element = element;
        this.localeServ = localeServ;
        this.diaryServ.getDiary(this.navParams.get('diaryId')).subscribe(function (diarySnap) {
            _this.diary = diarySnap;
        });
        this.diaryId = this.navParams.get('diaryId');
    }
    DiaryDetailPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    DiaryDetailPage.prototype.ionViewWillEnter = function () {
        this.adjustTextarea();
        this.theme = this.configServ.getUserGender();
    };
    DiaryDetailPage.prototype.adjustTextarea = function () {
        var area = this.element.nativeElement.querySelector("textarea");
        if (area !== null && area !== undefined) {
            area.style.height = area.scrollHeight + "px";
        }
    };
    DiaryDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    DiaryDetailPage.prototype.updateDiary = function (diaryId, diary) {
        this.modalCtrl.create(DiaryEditPage, { diaryId: diaryId, diary: diary }).present();
    };
    DiaryDetailPage.prototype.deleteDiary = function (diaryId) {
        var _this = this;
        var options = {
            title: '',
            message: '',
            buttons: [{
                    text: '',
                    handler: function () {
                        _this.diaryServ.deleteDiary(diaryId);
                        _this.dismiss();
                    }
                }, {
                    text: '',
                    role: 'cancel'
                }]
        };
        this.localeServ.localize('DIARY_DETAIL.DELETE.TITLE', function (value) { options.title = value; });
        this.localeServ.localize('DIARY_DETAIL.DELETE.MESSAGE', function (value) { options.message = value; });
        this.localeServ.localize('DIARY_DETAIL.DELETE.CONFIRM', function (value) { options.buttons[0].text = value; });
        this.localeServ.localize('DIARY_DETAIL.DELETE.CANCEL', function (value) { options.buttons[1].text = value; });
        var confirm = this.alertCtrl.create(options);
        confirm.present();
    };
    return DiaryDetailPage;
}());
DiaryDetailPage = __decorate([
    Component({
        selector: 'page-diary-detail',
        templateUrl: 'diary-detail.html'
    }),
    __metadata("design:paramtypes", [NavParams, ViewController,
        AlertController, ModalController,
        DiaryService, ConfigService,
        ElementRef,
        LocaleService])
], DiaryDetailPage);
export { DiaryDetailPage };
//# sourceMappingURL=diary-detail.js.map