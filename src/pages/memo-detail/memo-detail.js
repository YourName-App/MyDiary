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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MemoItemEditPage } from '../memo-item-edit/memo-item-edit';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
var MemoDetailPage = (function () {
    function MemoDetailPage(navCtrl, navParams, alertCtrl, memoServ, configServ, localeServ) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.memoServ = memoServ;
        this.configServ = configServ;
        this.localeServ = localeServ;
        this.memoId = '';
        this.entry = '';
        this.entryValid = true;
        this.entryChanged = false;
        this.createMode = false;
        this.submitAttempt = false;
        this.memoServ.getMemo(this.navParams.get('memoId')).subscribe(function (memoSnap) {
            _this.memo = memoSnap;
        });
        this.itemList = this.memoServ.getItemList(this.navParams.get('memoId'));
        this.memoId = this.navParams.get('memoId');
    }
    MemoDetailPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    MemoDetailPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    MemoDetailPage.prototype.toggleItem = function (itemId, item) {
        this.memoServ.updateItem(this.memoId, itemId, item.entry, !item.checked);
    };
    MemoDetailPage.prototype.toggleCreateMode = function () {
        this.createMode = !this.createMode;
    };
    MemoDetailPage.prototype.reset = function () {
        this.createMode = !this.createMode;
        this.entryValid = true;
        this.entry = '';
    };
    MemoDetailPage.prototype.entryChange = function () {
        this.entryChanged = true;
        if (this.entry.trim().length === 0) {
            this.entryValid = false;
        }
        else {
            this.entryValid = true;
        }
    };
    MemoDetailPage.prototype.createItem = function () {
        this.submitAttempt = true;
        if (this.entry.trim().length === 0) {
            this.entryValid = false;
        }
        else {
            this.entryValid = true;
            this.memoServ.createItem(this.memoId, { entry: this.entry, checked: false });
            this.entry = '';
        }
    };
    MemoDetailPage.prototype.updateItem = function () {
        this.navCtrl.push(MemoItemEditPage, { memoId: this.memoId });
    };
    MemoDetailPage.prototype.deleteItem = function (itemId) {
        this.memoServ.deleteItem(this.memoId, itemId);
    };
    MemoDetailPage.prototype.deleteAllItems = function () {
        var _this = this;
        var options = {
            title: '',
            message: '',
            buttons: [{
                    text: '',
                    handler: function () {
                        var deleteEvent = _this.itemList.subscribe(function (itemSnaps) {
                            itemSnaps.forEach(function (item) {
                                _this.deleteItem(item.$key);
                            });
                        });
                        deleteEvent.unsubscribe();
                    }
                }, {
                    text: '',
                    role: 'cancel'
                }]
        };
        this.localeServ.localize('MEMO_DETAIL.DELETE.TITLE', function (value) { options.title = value; });
        this.localeServ.localize('MEMO_DETAIL.DELETE.MESSAGE', function (value) { options.message = value; });
        this.localeServ.localize('MEMO_DETAIL.DELETE.CONFIRM', function (value) { options.buttons[0].text = value; });
        this.localeServ.localize('MEMO_DETAIL.DELETE.CANCEL', function (value) { options.buttons[1].text = value; });
        var confirm = this.alertCtrl.create(options);
        confirm.present();
    };
    return MemoDetailPage;
}());
MemoDetailPage = __decorate([
    Component({
        selector: 'page-memo-detail',
        templateUrl: 'memo-detail.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        AlertController, MemoService,
        ConfigService,
        LocaleService])
], MemoDetailPage);
export { MemoDetailPage };
//# sourceMappingURL=memo-detail.js.map