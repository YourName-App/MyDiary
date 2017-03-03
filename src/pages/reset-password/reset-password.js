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
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
var ResetPasswordPage = (function () {
    function ResetPasswordPage(navCtrl, authServ, formBuilder, alertCtrl) {
        this.navCtrl = navCtrl;
        this.authServ = authServ;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.emailChanged = false;
        this.submitAttempt = false;
        this.resetPasswordForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
        });
    }
    ResetPasswordPage.prototype.elementChanged = function (input) {
        this.emailChanged = true;
    };
    ResetPasswordPage.prototype.resetPassword = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        }
        else {
            this.authServ.resetPassword(this.resetPasswordForm.value.email).then(function (user) {
                var alert = _this.alertCtrl.create({
                    message: '重設密碼的連結已寄送至你的電子郵件',
                    buttons: [{
                            text: '確認',
                            role: 'cancel',
                            handler: function () {
                                _this.navCtrl.pop();
                            }
                        }]
                });
                alert.present();
            }, function (error) {
                var errorAlert = _this.alertCtrl.create({
                    message: '此電子郵件尚未註冊。',
                    buttons: [{
                            text: '確認',
                            role: 'cancel'
                        }]
                });
                errorAlert.present();
            });
        }
    };
    return ResetPasswordPage;
}());
ResetPasswordPage = __decorate([
    Component({
        selector: 'page-reset-password',
        templateUrl: 'reset-password.html'
    }),
    __metadata("design:paramtypes", [NavController, AuthService,
        FormBuilder, AlertController])
], ResetPasswordPage);
export { ResetPasswordPage };
//# sourceMappingURL=reset-password.js.map