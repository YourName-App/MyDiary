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
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
var MemoEditPage = (function () {
    function MemoEditPage(navParams, viewCtrl, memoServ, formBuilder, configServ, localeServ) {
        var _this = this;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.memoServ = memoServ;
        this.formBuilder = formBuilder;
        this.configServ = configServ;
        this.localeServ = localeServ;
        this.memoId = '';
        this.inputTitle = '';
        this.mode = '';
        this.modeDesc = '';
        this.titleChanged = false;
        this.submitAttempt = false;
        this.memoId = this.navParams.get('memoId') || '';
        this.inputTitle = this.navParams.get('title') || '';
        this.memoForm = formBuilder.group({
            title: ['', Validators.required]
        });
        if (this.navParams.get('memoId')) {
            this.mode = 'update';
            // this.modeDesc = '編輯備忘錄';
            this.localeServ.subscribe(this, 'MEMO_EDIT.TITLE_UPDATE', function (component, value) { _this.modeDesc = value; });
            this.memoForm.controls['title'].patchValue(this.inputTitle);
        }
        else {
            this.mode = 'create';
            // this.modeDesc = '新增備忘錄';
            this.localeServ.subscribe(this, 'MEMO_EDIT.TITLE_CREATE', function (component, value) { _this.modeDesc = value; });
        }
    }
    MemoEditPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    MemoEditPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    MemoEditPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    MemoEditPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    MemoEditPage.prototype.editMemo = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.memoForm.valid) {
            console.log(this.memoForm.value);
        }
        else {
            if (this.mode === 'create') {
                this.memoServ.createMemo(this.memoForm.value.title).then(function () { _this.dismiss(); }, function (error) { console.log(error); });
            }
            else if (this.mode === 'update') {
                this.memoServ.updateMemo(this.memoId, this.memoForm.value.title).then(function () { _this.dismiss(); }, function (error) { console.log(error); });
            }
        }
    };
    return MemoEditPage;
}());
MemoEditPage = __decorate([
    Component({
        selector: 'page-memo-edit',
        templateUrl: 'memo-edit.html'
    }),
    __metadata("design:paramtypes", [NavParams, ViewController,
        MemoService, FormBuilder,
        ConfigService,
        LocaleService])
], MemoEditPage);
export { MemoEditPage };
//# sourceMappingURL=memo-edit.js.map