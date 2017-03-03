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
import { NavController, AlertController } from 'ionic-angular';
import { MemoEditPage } from '../memo-edit/memo-edit';
import { MemoDetailPage } from '../memo-detail/memo-detail';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';
var MemoListPage = (function () {
    function MemoListPage(navCtrl, alertCtrl, memoServ, configServ) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.memoServ = memoServ;
        this.configServ = configServ;
        this.initializeMemo();
    }
    MemoListPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    MemoListPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    MemoListPage.prototype.initializeMemo = function () {
        this.memoList = this.memoServ.getMemoList();
    };
    MemoListPage.prototype.showMemoDetail = function (memoId) {
        this.navCtrl.push(MemoDetailPage, { memoId: memoId });
    };
    MemoListPage.prototype.createMemo = function () {
        this.navCtrl.push(MemoEditPage);
    };
    MemoListPage.prototype.updateMemo = function (memoId, title, slidingItem) {
        this.navCtrl.push(MemoEditPage, { memoId: memoId, title: title });
        slidingItem.close();
    };
    MemoListPage.prototype.deleteMemo = function (memoId, slidingItem) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '刪除備忘錄',
            message: '確認刪除？',
            buttons: [{
                    text: '確認',
                    handler: function () {
                        _this.memoServ.deleteMemo(memoId);
                    }
                }, {
                    text: '取消',
                    role: 'cancel'
                }]
        });
        confirm.present();
        slidingItem.close();
    };
    MemoListPage.prototype.searchMemo = function (ev) {
        this.initializeMemo();
        var targetVal = ev.target.value;
        if (targetVal && targetVal.trim() != '') {
            this.memoList = this.memoList.map(function (memos) {
                var result = memos.filter(function (memo) { return memo.title.toLowerCase().indexOf(targetVal.toLowerCase()) > -1; });
                return result;
            });
        }
    };
    return MemoListPage;
}());
MemoListPage = __decorate([
    Component({
        selector: 'page-memo-list',
        templateUrl: 'memo-list.html'
    }),
    __metadata("design:paramtypes", [NavController, AlertController,
        MemoService, ConfigService])
], MemoListPage);
export { MemoListPage };
//# sourceMappingURL=memo-list.js.map