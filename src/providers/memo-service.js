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
var MemoService = (function () {
    function MemoService(af) {
        var _this = this;
        this.af = af;
        this.af.auth.subscribe(function (auth) {
            if (auth) {
                _this.memoList = af.database.list("/userProfile/" + auth.uid + "/memoList");
                _this.userId = auth.uid;
            }
        });
    }
    // Get the full list of memos
    MemoService.prototype.getMemoList = function () {
        return this.memoList;
    };
    // Get a specific memo from the list
    MemoService.prototype.getMemo = function (memoId) {
        return this.memoDetail =
            this.af.database.object("/userProfile/" + this.userId + "/memoList/" + memoId);
    };
    // Create a new memo
    MemoService.prototype.createMemo = function (title) {
        return this.memoList.push({ title: title });
    };
    // Update an existing memo
    MemoService.prototype.updateMemo = function (memoId, title) {
        return this.memoList.update(memoId, { title: title });
    };
    // Delete an existing memo
    MemoService.prototype.deleteMemo = function (memoId) {
        return this.memoList.remove(memoId);
    };
    // Get the full list of items
    MemoService.prototype.getItemList = function (memoId) {
        return this.itemList =
            this.af.database.list("/userProfile/" + this.userId + "/memoList/" + memoId + "/itemList");
    };
    // Get a specific item from the list
    MemoService.prototype.getItem = function (memoId, itemId) {
        return this.memoDetail =
            this.af.database.object("/userProfile/" + this.userId + "/memoList/" + memoId + "/itemList/" + itemId);
    };
    // Create a new memo item
    MemoService.prototype.createItem = function (memoId, item) {
        return this.af.database.list("/userProfile/" + this.userId + "/memoList/" + memoId + "/itemList").push(item);
    };
    // Update an existing memo item
    MemoService.prototype.updateItem = function (memoId, itemId, entry, checked) {
        return this.af.database.list("/userProfile/" + this.userId + "/memoList/" + memoId + "/itemList")
            .update(itemId, { entry: entry, checked: checked });
    };
    // Delete an existing memo item
    MemoService.prototype.deleteItem = function (memoId, itemId) {
        return this.af.database.list("/userProfile/" + this.userId + "/memoList/" + memoId + "/itemList").remove(itemId);
    };
    return MemoService;
}());
MemoService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire])
], MemoService);
export { MemoService };
//# sourceMappingURL=memo-service.js.map