var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { ConfigService } from '../../providers/config-service';
import * as moment from 'moment';
import 'moment/locale/zh-tw';
var CalendarPage = (function () {
    function CalendarPage(configServ) {
        this.configServ = configServ;
        moment.locale('zh-tw');
        this.timestamp = moment().format();
        this.month = moment(this.timestamp).format('MMMM');
        this.day = moment(this.timestamp).format('dddd');
        this.date = moment(this.timestamp).format('D');
    }
    Object.defineProperty(CalendarPage.prototype, "theme", {
        set: function (theme) {
            this._theme = theme;
        },
        enumerable: true,
        configurable: true
    });
    CalendarPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    CalendarPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    return CalendarPage;
}());
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], CalendarPage.prototype, "theme", null);
CalendarPage = __decorate([
    Component({
        selector: 'page-calendar',
        templateUrl: 'calendar.html'
    }),
    __metadata("design:paramtypes", [ConfigService])
], CalendarPage);
export { CalendarPage };
//# sourceMappingURL=calendar.js.map