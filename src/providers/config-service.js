var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { PinDialog } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
import { LocaleService } from '../providers/locale-service';
var ConfigService = (function () {
    function ConfigService(storage, alertCtrl, translate, localServ) {
        var _this = this;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.localServ = localServ;
        this.userName = '';
        this.userGender = '';
        this.userAvatar = '';
        this.userPin = '';
        this.pauseEmitted = 'Y';
        this.musicPlayed = false;
        this.storage.get('userName').then(function (val) {
            if (val === null || val.trim().length === 0) {
                // val = '你的名字是？';
                // apply prompt message by locale
                localServ.localize('YOUR_NAME', function (value) { val = value; });
            }
            _this.userName = val;
        }, function (error) {
            console.log(error);
        });
        this.storage.get('userGender').then(function (val) {
            if (val === null || val.trim().length === 0) {
                val = 'male';
            }
            _this.userGender = val;
        }, function (error) {
            console.log(error);
        });
        this.storage.get('userAvatar').then(function (val) {
            if (val === null || val.trim().length === 0) {
                val = 'assets/img/avatar-male.png';
            }
            _this.userAvatar = val;
        }, function (error) {
            console.log(error);
        });
        this.storage.get('userPin').then(function (val) {
            if (val === null || val.trim().length < 4) {
                val = '';
            }
            _this.userPin = val;
        }, function (error) {
            console.log(error);
        });
    }
    ConfigService.prototype.getUserName = function () {
        return this.userName;
    };
    ConfigService.prototype.getUserGender = function () {
        return this.userGender;
    };
    ConfigService.prototype.getUserAvatar = function () {
        return this.userAvatar;
    };
    ConfigService.prototype.getUserPin = function () {
        return this.userPin;
    };
    ConfigService.prototype.getPauseEmitted = function () {
        return this.pauseEmitted;
    };
    ConfigService.prototype.getMusicPlayed = function () {
        return this.musicPlayed;
    };
    ConfigService.prototype.setUserName = function (name) {
        this.userName = name;
    };
    ConfigService.prototype.setUserGender = function (gender) {
        this.userGender = gender;
    };
    ConfigService.prototype.setUserAvatar = function (avatar) {
        this.userAvatar = avatar;
    };
    ConfigService.prototype.setUserPin = function (pin) {
        this.userPin = pin;
    };
    ConfigService.prototype.setPauseEmitted = function (pauseEmitted) {
        this.pauseEmitted = pauseEmitted;
    };
    ConfigService.prototype.setMusicPlayed = function (musicPlayed) {
        this.musicPlayed = musicPlayed;
    };
    ConfigService.prototype.unlockScreen = function () {
        var _this = this;
        var canEnter = false;
        var message; // 請輸入密碼
        var title; // 解除密碼鎖
        var btnConfirm; // 確認
        var btnCancel; // 取消
        var alertMessageSuccess; // 成功解除密碼鎖
        var alertMessageError; // 密碼錯誤
        this.localServ.localize('CONFIG_SERV.MESSAGE', function (value) { message = value; });
        this.localServ.localize('CONFIG_SERV.TITLE', function (value) { title = value; });
        this.localServ.localize('CONFIG_SERV.BTN_CONFIRM', function (value) { btnConfirm = value; });
        this.localServ.localize('CONFIG_SERV.BTN_CANCEL', function (value) { btnCancel = value; });
        this.localServ.localize('CONFIG_SERV.ALERT_MSG_SUCCESS', function (value) { alertMessageSuccess = value; });
        this.localServ.localize('CONFIG_SERV.ALERT_MSG_ERROR', function (value) { alertMessageError = value; });
        if (this.getPauseEmitted() === 'Y' && this.getUserPin().length >= 4) {
            PinDialog.prompt(message, title, [btnConfirm, btnCancel])
                .then(function (result) {
                if (result.buttonIndex === 1) {
                    if (result.input1 === _this.getUserPin()) {
                        _this.alertMessage(alertMessageSuccess);
                        _this.setPauseEmitted('N');
                        canEnter = true;
                    }
                    else {
                        _this.alertMessage(alertMessageError);
                        canEnter = false;
                    }
                }
                else {
                    canEnter = false;
                }
            });
        }
        else {
            canEnter = true;
        }
        return canEnter;
    };
    ConfigService.prototype.alertMessage = function (msg) {
        var options = {
            message: msg,
            buttons: [{
                    text: '',
                    role: 'cancel'
                }]
        };
        this.localServ.localize('CONFIG_SERV.BTN_ALERT', function (value) { options.buttons[0].text = value; });
        var alert = this.alertCtrl.create(options);
        alert.present();
    };
    return ConfigService;
}());
ConfigService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage, AlertController,
        TranslateService,
        LocaleService])
], ConfigService);
export { ConfigService };
//# sourceMappingURL=config-service.js.map