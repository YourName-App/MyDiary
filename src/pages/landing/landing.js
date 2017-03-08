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
import { NavController, LoadingController, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth-service';
var LandingPage = (function () {
    function LandingPage(navCtrl, authServ, loadingCtrl, menu) {
        this.navCtrl = navCtrl;
        this.authServ = authServ;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.menu.swipeEnable(false);
    }
    LandingPage.prototype.goToLogin = function () {
        this.navCtrl.push(LoginPage);
    };
    LandingPage.prototype.goToSignup = function () {
        this.navCtrl.push(SignupPage);
    };
    LandingPage.prototype.goToAnonymousLogin = function () {
        var _this = this;
        this.authServ.anonymousLogin().then(function (user) {
            _this.navCtrl.setRoot(TabsPage);
        }, function (error) {
            console.log(error);
        });
        var loader = this.loadingCtrl.create({
            dismissOnPageChange: true
        });
        loader.present();
    };
    return LandingPage;
}());
LandingPage = __decorate([
    Component({
        selector: 'page-landing',
        templateUrl: 'landing.html'
    }),
    __metadata("design:paramtypes", [NavController, AuthService,
        LoadingController, MenuController])
], LandingPage);
export { LandingPage };
//# sourceMappingURL=landing.js.map