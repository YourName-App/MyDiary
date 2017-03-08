var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import { DiaryService } from '../../providers/diary-service';
import { DiaryEditPage } from '../diary-edit/diary-edit';
import { DiaryDetailPage } from '../diary-detail/diary-detail';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
var DiaryListPage = (function () {
    function DiaryListPage(alertCtrl, modalCtrl, diaryServ, configServ, localeServ) {
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.diaryServ = diaryServ;
        this.configServ = configServ;
        this.localeServ = localeServ;
    }
    Object.defineProperty(DiaryListPage.prototype, "diaryList", {
        set: function (diaryList) {
            this._diaryList = diaryList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiaryListPage.prototype, "theme", {
        set: function (theme) {
            this._theme = theme;
        },
        enumerable: true,
        configurable: true
    });
    DiaryListPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    DiaryListPage.prototype.showDiaryDetail = function (diaryId) {
        this.modalCtrl.create(DiaryDetailPage, { diaryId: diaryId }).present();
    };
    DiaryListPage.prototype.createDiary = function () {
        this.modalCtrl.create(DiaryEditPage).present();
    };
    DiaryListPage.prototype.updateDiary = function (diaryId, diary, slidingItem) {
        this.modalCtrl.create(DiaryEditPage, { diaryId: diaryId, diary: diary }).present();
        slidingItem.close();
    };
    DiaryListPage.prototype.deleteDiary = function (diaryId, slidingItem) {
        var _this = this;
        var options = {
            title: '',
            message: '',
            buttons: [{
                    text: '',
                    handler: function () {
                        _this.diaryServ.deleteDiary(diaryId);
                    }
                }, {
                    text: '',
                    role: 'cancel'
                }]
        };
        var confirm = this.alertCtrl.create(options);
        this.localeServ.localize('DIARY_LIST.DELETE.TITLE', function (value) { options.title = value; });
        this.localeServ.localize('DIARY_LIST.DELETE.MESSAGE', function (value) { options.message = value; });
        this.localeServ.localize('DIARY_LIST.DELETE.CONFIRM', function (value) { options.buttons[0].text = value; });
        this.localeServ.localize('DIARY_LIST.DELETE.CANCEL', function (value) { options.buttons[1].text = value; });
        confirm.present();
        slidingItem.close();
    };
    return DiaryListPage;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DiaryListPage.prototype, "diaryList", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DiaryListPage.prototype, "theme", null);
DiaryListPage = __decorate([
    Component({
        selector: 'page-diary-list',
        templateUrl: 'diary-list.html'
    }),
    __metadata("design:paramtypes", [AlertController, ModalController,
        DiaryService, ConfigService,
        LocaleService])
], DiaryListPage);
export { DiaryListPage };
//# sourceMappingURL=diary-list.js.map