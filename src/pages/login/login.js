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
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { EmailValidator } from '../../validators/email';
var LoginPage = (function () {
    function LoginPage(navCtrl, authServ, formBuilder, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.authServ = authServ;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    LoginPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.authServ.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(function () {
                _this.loader.dismiss();
            }, function (error) {
                _this.loader.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: '登入失敗，請確認你的電子郵件與密碼。',
                        buttons: [{
                                text: '確認',
                                role: 'cancel'
                            }]
                    });
                    alert.present();
                });
            });
            this.loader = this.loadingCtrl.create();
            this.loader.present();
        }
    };
    LoginPage.prototype.goToResetPassword = function () {
        this.navCtrl.push(ResetPasswordPage);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController, AuthService,
        FormBuilder, AlertController,
        LoadingController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map