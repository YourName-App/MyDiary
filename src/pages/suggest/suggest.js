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
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SocialSharing } from 'ionic-native';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
var SuggestPage = (function () {
    function SuggestPage(alertCtrl, formBuilder, configServ, localeServ) {
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.configServ = configServ;
        this.localeServ = localeServ;
        this.suggestChanged = false;
        this.submitAttempt = false;
        this.suggestForm = formBuilder.group({
            suggest: ['', Validators.required]
        });
    }
    SuggestPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    SuggestPage.prototype.elementChanged = function (input) {
        this.suggestChanged = true;
    };
    SuggestPage.prototype.sendSuggestion = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.suggestForm.valid) {
            console.log(this.suggestForm.value);
        }
        else {
            SocialSharing.canShareViaEmail()
                .then(function () {
                var subject = '';
                _this.localeServ.localize('SUGGEST_PAGE.SEND.SUBJECT', function (value) { subject = value; });
                SocialSharing.shareViaEmail(_this.suggestForm.value.suggest, subject, ['yourname.ionic.app@gmail.com']);
            })
                .catch(function () {
                var options = {
                    message: '',
                    buttons: [{
                            text: '',
                            role: 'cancel'
                        }]
                };
                _this.localeServ.localize('SUGGEST_PAGE.ALERT.MSG', function (value) { options.message = value; });
                _this.localeServ.localize('SUGGEST_PAGE.ALERT.CONFIRM', function (value) { options.buttons[0].text = value; });
                var alert = _this.alertCtrl.create(options);
                alert.present();
            });
        }
    };
    return SuggestPage;
}());
SuggestPage = __decorate([
    Component({
        selector: 'page-suggest',
        templateUrl: 'suggest.html'
    }),
    __metadata("design:paramtypes", [AlertController, FormBuilder,
        ConfigService,
        LocaleService])
], SuggestPage);
export { SuggestPage };
//# sourceMappingURL=suggest.js.map