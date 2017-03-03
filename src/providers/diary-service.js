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
import { AngularFire } from 'angularfire2';
var DiaryService = (function () {
    function DiaryService(af) {
        var _this = this;
        this.af = af;
        this.af.auth.subscribe(function (auth) {
            if (auth) {
                _this.diaryList = af.database.list("/userProfile/" + auth.uid + "/diaryList");
                _this.userId = auth.uid;
            }
        });
    }
    // Get the full list of contacts
    DiaryService.prototype.getDiaryList = function () {
        return this.diaryList;
    };
    // Get a specific contact from the list
    DiaryService.prototype.getDiary = function (diaryId) {
        return this.diaryDetail =
            this.af.database.object("/userProfile/" + this.userId + "/diaryList/" + diaryId);
    };
    // Create a new contact
    DiaryService.prototype.createDiary = function (diary) {
        return this.diaryList.push(diary);
    };
    // Update an existing contact
    DiaryService.prototype.updateDiary = function (diaryId, diary) {
        return this.diaryList.update(diaryId, diary);
    };
    // Delete an existing contact
    DiaryService.prototype.deleteDiary = function (diaryId) {
        return this.diaryList.remove(diaryId);
    };
    return DiaryService;
}());
DiaryService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire])
], DiaryService);
export { DiaryService };
//# sourceMappingURL=diary-service.js.map