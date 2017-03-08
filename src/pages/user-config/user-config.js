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
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
var UserConfigPage = (function () {
    function UserConfigPage(navCtrl, appCtrl, storage, configServ, localeServ) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.storage = storage;
        this.configServ = configServ;
        this.localeServ = localeServ;
        this.userName = this.configServ.getUserName();
        if (this.userName === null || this.userName.trim().length === 0) {
        }
        else {
            this.localeServ.subscribe('YOUR_NAME', function (value) { _this.userName = value; });
        }
        this.userGender = this.configServ.getUserGender();
    }
    UserConfigPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    UserConfigPage.prototype.updateSetting = function () {
        this.storage.set('userName', this.userName);
        this.storage.set('userGender', this.userGender);
        if (this.userGender === null || this.userGender.trim().length === 0) {
            this.userAvatar = 'userAvatar', 'assets/img/avatar-male.png';
            this.storage.set('userAvatar', this.userAvatar);
        }
        else {
            this.userAvatar = 'assets/img/avatar-' + this.userGender + '.png';
            this.storage.set('userAvatar', this.userAvatar);
        }
        this.configServ.setUserName(this.userName);
        this.configServ.setUserGender(this.userGender);
        this.configServ.setUserAvatar(this.userAvatar);
        this.navCtrl.pop();
        this.appCtrl.getRootNav().setRoot(HomePage);
    };
    // To change the language the app is currently using
    UserConfigPage.prototype.updateLocale = function () {
        this.localeServ.use(this.userLocale.trim());
        this.localeServ.updatePageLocale();
    };
    return UserConfigPage;
}());
UserConfigPage = __decorate([
    Component({
        selector: 'page-user-config',
        templateUrl: 'user-config.html'
    }),
    __metadata("design:paramtypes", [NavController, App,
        Storage, ConfigService,
        LocaleService])
], UserConfigPage);
export { UserConfigPage };
//# sourceMappingURL=user-config.js.map