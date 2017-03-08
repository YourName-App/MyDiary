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
import { TranslateService } from 'ng2-translate';
var TargetOnLocaleChange = (function () {
    function TargetOnLocaleChange() {
    }
    return TargetOnLocaleChange;
}());
export { TargetOnLocaleChange };
var LocaleService = (function () {
    function LocaleService(translate) {
        this.translate = translate;
        //  update the locale of the rest of component subscribed
        this.listToLocaleUpdate = [];
        //	currentLang:string = this.translate.currentLang;
        this.onCalendarLocaleChange = function () { };
        translate.setDefaultLang('en');
        this.updatePageLocale();
        this.onCalendarLocaleChange();
    }
    LocaleService.prototype.subscribeTargetOnLocaleChange = function (target) {
        this.listToLocaleUpdate.push(target);
        this.localize(target.mapping, target.update);
    };
    LocaleService.prototype.subscribe = function (mapping, update) {
        var target = new TargetOnLocaleChange();
        target.mapping = mapping;
        target.update = update;
        this.listToLocaleUpdate.push(target);
        this.localize(mapping, update);
    };
    LocaleService.prototype.use = function (locale) {
        this.translate.use(locale);
        this.onCalendarLocaleChange();
    };
    LocaleService.prototype.updatePageLocale = function () {
        var _loop_1 = function (target) {
            this_1.translate.get(target.mapping).subscribe(function (value) {
                target.update(value);
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.listToLocaleUpdate; _i < _a.length; _i++) {
            var target = _a[_i];
            _loop_1(target);
        }
    };
    LocaleService.prototype.localize = function (mapping, update) {
        this.translate.get(mapping).subscribe(function (value) {
            update(value);
        });
    };
    LocaleService.prototype.subscribeCalendar = function (onLocaleChange) {
        var _this = this;
        this.onCalendarLocaleChange = function () {
            onLocaleChange(_this.translate.currentLang);
        };
    };
    LocaleService.prototype.localizeCalendar = function (onLocaleChange) {
        onLocaleChange(this.translate.currentLang);
    };
    LocaleService.prototype.getCalendarLang = function () {
        if (this.getCurrentLang() == 'en') {
            this.init('en');
        }
        else if (this.getCurrentLang() == 'ch') {
            this.init('zh-tw');
        }
    };
    LocaleService.prototype.getCurrentLang = function () {
        return this.translate.currentLang;
    };
    return LocaleService;
}());
LocaleService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TranslateService])
], LocaleService);
export { LocaleService };
//# sourceMappingURL=locale-service.js.map