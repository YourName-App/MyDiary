var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Splashscreen } from 'ionic-native';
// Import pages
import { LandingPage } from '../pages/landing/landing';
import { HomePage } from '../pages/home/home';
import { SuggestPage } from '../pages/suggest/suggest';
import { AboutPage } from '../pages/about/about';
import { UserConfigPage } from '../pages/user-config/user-config';
import { PinConfigPage } from '../pages/pin-config/pin-config';
// Import providers
import { AuthService } from '../providers/auth-service';
import { ConfigService } from '../providers/config-service';
import { LocaleService } from '../providers/locale-service';
// Import AF2
import { AngularFire } from 'angularfire2';
var MyApp = (function () {
    function MyApp(platform, af, authServ, configServ, localeServ) {
        var _this = this;
        this.platform = platform;
        this.af = af;
        this.authServ = authServ;
        this.configServ = configServ;
        this.localeServ = localeServ;
        // List of pages that can be navigated to from the side menu
        this.settingPages = [
            { title: '', component: UserConfigPage, pushPage: true, icon: 'ios-person-outline' },
            { title: '', component: PinConfigPage, pushPage: true, icon: 'ios-lock-outline' },
        ];
        this.otherPages = [
            { title: '', component: SuggestPage, pushPage: true, icon: 'ios-chatbubbles-outline' },
            { title: '', component: AboutPage, pushPage: true, icon: 'ios-help-circle-outline' } // 關於
        ];
        this.accountPages = [
            { title: '登出', component: LandingPage, icon: 'log-out', logsOut: true }
        ];
        this.localeServ.subscribe('PAGE.SETTING.USER', function (value) { _this.settingPages[0].title = value; });
        this.localeServ.subscribe('PAGE.SETTING.LOCK', function (value) { _this.settingPages[1].title = value; });
        this.localeServ.subscribe('PAGE.OTHER.SUGGESTION', function (value) { _this.otherPages[0].title = value; });
        this.localeServ.subscribe('PAGE.OTHER.ABOUT', function (value) { _this.otherPages[1].title = value; });
        this.localeServ.subscribe('PAGE.ACCOUNT.LOGOUT', function (value) { _this.accountPages[0].title = value; });
        // Listen for authentication
        af.auth.subscribe(function (user) {
            if (user) {
                _this.rootPage = HomePage;
            }
            else {
                _this.rootPage = LandingPage;
            }
            localeServ.updatePageLocale();
        }, function (error) {
            console.log(error);
        });
        platform.ready().then(function () {
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            _this.configServ.setMusicPlayed(false);
            // Listen for pause event (emits when the native platform puts the application into the background)
            platform.pause.subscribe(function () {
                _this.configServ.setPauseEmitted('Y');
                if (_this.configServ.getUserPin().length >= 4) {
                    _this.nav.setRoot(HomePage);
                }
            });
        }, function (error) {
            console.log(error);
        });
    }
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        if (page.pushPage === true) {
            this.nav.push(page.component);
        }
        else {
            this.nav.setRoot(page.component);
        }
        if (page.logsOut === true) {
            setTimeout(function () {
                _this.authServ.logoutUser();
            }, 200);
        }
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, AngularFire,
        AuthService, ConfigService,
        LocaleService])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map