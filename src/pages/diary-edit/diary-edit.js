var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePicker } from 'ionic-native';
import { DiaryService } from '../../providers/diary-service';
import { ConfigService } from '../../providers/config-service';
import * as moment from 'moment';
import 'moment/locale/zh-tw';
var DiaryEditPage = (function () {
    function DiaryEditPage(navParams, viewCtrl, diaryServ, formBuilder, element, configServ) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.diaryServ = diaryServ;
        this.formBuilder = formBuilder;
        this.element = element;
        this.configServ = configServ;
        this.diaryId = '';
        this.inputTimeStamp = '';
        this.inputTitle = '';
        this.inputContent = '';
        this.mode = '';
        this.modeDesc = '';
        this.contentChanged = false;
        this.submitAttempt = false;
        this.diaryId = this.navParams.get('diaryId') || '';
        this.inputDiary = this.navParams.get('diary') || {};
        this.inputTimeStamp = this.inputDiary.timestamp || '';
        this.inputTitle = this.inputDiary.title || '';
        this.inputContent = this.inputDiary.content || '';
        this.mood = this.inputDiary.mood || 'happy';
        this.weather = this.inputDiary.weather || 'sunny';
        this.diaryForm = formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required]
        });
        moment.locale('zh-tw');
        if (this.diaryId) {
            this.mode = 'update';
            this.modeDesc = '編輯日記';
            this.diaryForm.controls['title'].patchValue(this.inputTitle);
            this.diaryForm.controls['content'].patchValue(this.inputContent);
            this.timestamp = this.inputTimeStamp;
        }
        else {
            this.mode = 'create';
            this.modeDesc = '新增日記';
            this.timestamp = moment().format();
        }
        this.diaryYear = moment(this.timestamp).format('YYYY');
        this.diaryMonth = moment(this.timestamp).format('MMMM');
        this.diaryDay = moment(this.timestamp).format('dddd');
        this.diaryDate = moment(this.timestamp).format('D');
        this.diaryTime = moment(this.timestamp).format('HH:mm');
    }
    DiaryEditPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    DiaryEditPage.prototype.ionViewWillEnter = function () {
        this.adjustTextarea();
        this.theme = this.configServ.getUserGender();
    };
    DiaryEditPage.prototype.adjustTextarea = function () {
        var area = this.element.nativeElement.querySelector("textarea");
        if (area !== null && area !== undefined) {
            area.style.height = area.scrollHeight + "px";
        }
    };
    DiaryEditPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    DiaryEditPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    DiaryEditPage.prototype.openDatePicker = function () {
        var _this = this;
        DatePicker.show({
            date: moment(this.timestamp).toDate(),
            mode: 'datetime',
            locale: 'zh-tw',
            doneButtonLabel: '確認',
            cancelButtonLabel: '取消',
            is24Hour: true
        }).then(function (pickDate) {
            if (pickDate !== null && pickDate !== undefined) {
                _this.timestamp = moment(pickDate).format();
                _this.diaryYear = moment(pickDate).format('YYYY');
                _this.diaryMonth = moment(pickDate).format('MMMM');
                _this.diaryDay = moment(pickDate).format('dddd');
                _this.diaryDate = moment(pickDate).format('D');
                _this.diaryTime = moment(pickDate).format('HH:mm');
            }
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    DiaryEditPage.prototype.editDiary = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.diaryForm.valid) {
            console.log(this.diaryForm.value);
        }
        else {
            var sortstamp = Number(moment(this.timestamp).format('YYYYMMDDHHmm')) * (-1);
            var diary = {
                ".priority": sortstamp,
                timestamp: this.timestamp,
                year: this.diaryYear,
                month: this.diaryMonth,
                day: this.diaryDay,
                date: this.diaryDate,
                time: this.diaryTime,
                title: this.diaryForm.value.title,
                content: this.diaryForm.value.content.trim(),
                mood: this.mood,
                weather: this.weather
            };
            if (this.mode === 'create') {
                this.diaryServ.createDiary(diary)
                    .then(function () { _this.dismiss(); }, function (error) { console.log(error); });
            }
            else if (this.mode === 'update') {
                this.diaryServ.updateDiary(this.diaryId, diary)
                    .then(function () { _this.dismiss(); }, function (error) { console.log(error); });
            }
        }
    };
    DiaryEditPage.prototype.selectMood = function (mood, fab) {
        this.mood = mood;
        fab.close();
    };
    DiaryEditPage.prototype.selectWeather = function (weather, fab) {
        this.weather = weather;
        fab.close();
    };
    return DiaryEditPage;
}());
DiaryEditPage = __decorate([
    Component({
        selector: 'page-diary-edit',
        templateUrl: 'diary-edit.html'
    }),
    __metadata("design:paramtypes", [NavParams, ViewController,
        DiaryService, FormBuilder,
        ElementRef, ConfigService])
], DiaryEditPage);
export { DiaryEditPage };
//# sourceMappingURL=diary-edit.js.map