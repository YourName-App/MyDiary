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
import { NavController, App, AlertController } from 'ionic-angular';
import { PinDialog } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
var PinConfigPage = (function () {
    function PinConfigPage(navCtrl, appCtrl, configServ, alertCtrl, storage, localeServ) {
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.configServ = configServ;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.localeServ = localeServ;
        this.subscribeLocaleUpdate();
    }
    PinConfigPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
        this.userPin = this.configServ.getUserPin();
        this.enableLock = this.userPin.length >= 4;
    };
    PinConfigPage.prototype.addPin = function () {
        var _this = this;
        //PinDialog.prompt('請輸入至少4個數字的密碼', '設定密碼', ['確認', '取消'])
        PinDialog.prompt(this.addPinPromptMsg, this.addPinTitle, [this.addPinConfirmBtn, this.addPinCancelBtn])
            .then(function (result) {
            if (result.buttonIndex === 1) {
                if (result.input1 !== null && result.input1.trim().length >= 4) {
                    _this.confirmPin(result.input1);
                }
                else {
                    _this.alertMessage(_this.addPinAlertMsg);
                }
            }
        });
    };
    PinConfigPage.prototype.confirmPin = function (pin) {
        var _this = this;
        //PinDialog.prompt('請重複輸入密碼', '確認密碼', ['確認', '取消'])
        PinDialog.prompt(this.ConfirmPinPromptMsg, this.ConfirmPinTitle, [this.ConfirmPinConfirmBtn, this.ConfirmPinCancelBtn])
            .then(function (result) {
            if (result.buttonIndex === 1) {
                if (result.input1 === pin) {
                    _this.storage.set('userPin', result.input1);
                    _this.userPin = result.input1;
                    _this.configServ.setUserPin(result.input1);
                    _this.configServ.setPauseEmitted('Y');
                    _this.enableLock = !_this.enableLock;
                    _this.appCtrl.getRootNav().setRoot(HomePage);
                }
                else {
                    _this.alertMessage(_this.ConfirmPinAlertMsg);
                }
            }
        });
    };
    PinConfigPage.prototype.removePin = function () {
        var _this = this;
        //PinDialog.prompt('請輸入密碼', '關閉密碼', ['確認', '取消'])
        PinDialog.prompt(this.RemovePinPromptMsg, this.RemovePinTitle, [this.RemovePinConfirmBtn, this.RemovePinCancelBtn])
            .then(function (result) {
            if (result.input1 === _this.configServ.getUserPin()) {
                _this.storage.set('userPin', '');
                _this.userPin = '';
                _this.configServ.setUserPin('');
                _this.configServ.setPauseEmitted('N');
                _this.enableLock = !_this.enableLock;
                _this.appCtrl.getRootNav().setRoot(HomePage);
            }
            else {
                _this.alertMessage(_this.RemovePinAlertMsg);
            }
        });
    };
    PinConfigPage.prototype.alertMessage = function (msg) {
        var alert = this.alertCtrl.create({
            message: msg,
            buttons: [{
                    //text: '確認',
                    text: this.alertCtrl,
                    role: 'cancel'
                }]
        });
        alert.present();
    };
    PinConfigPage.prototype.subscribeLocaleUpdate = function () {
        var _this = this;
        this.localeServ.subscribe('PIN_CONFIG_PAGE.ADD_PIN_PROMPT_MSG', function (value) { _this.addPinPromptMsg = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.ADD_PIN_TITLE', function (value) { _this.addPinTitle = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.ADD_PIN_CONFIRM_BTN', function (value) { _this.addPinConfirmBtn = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.ADD_PIN_CANCEL_BTN', function (value) { _this.addPinCancelBtn = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.ADD_PIN_ALERT_MSG', function (value) { _this.addPinAlertMsg = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_PROMPT_MSG', function (value) { _this.ConfirmPinPromptMsg = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_TITLE', function (value) { _this.ConfirmPinTitle = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_CONFIRM_BTN', function (value) { _this.ConfirmPinConfirmBtn = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_CANCEL_BTN', function (value) { _this.ConfirmPinCancelBtn = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.CONFIRM_PIN_ALERT_MSG', function (value) { _this.ConfirmPinAlertMsg = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_PROMPT_MSG', function (value) { _this.RemovePinPromptMsg = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_TITLE', function (value) { _this.RemovePinTitle = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_CONFIRM_BTN', function (value) { _this.RemovePinConfirmBtn = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_CANCEL_BTN', function (value) { _this.RemovePinCancelBtn = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.REMOVE_PIN_ALERT_MSG', function (value) { _this.RemovePinAlertMsg = value; });
        this.localeServ.subscribe('PIN_CONFIG_PAGE.ALERT_MSG_BTN', function (value) { _this.alertMsgBtn = value; });
    };
    return PinConfigPage;
}());
PinConfigPage = __decorate([
    Component({
        selector: 'page-pin-config',
        templateUrl: 'pin-config.html'
    }),
    __metadata("design:paramtypes", [NavController, App,
        ConfigService, AlertController,
        Storage,
        LocaleService])
], PinConfigPage);
export { PinConfigPage };
//# sourceMappingURL=pin-config.js.map