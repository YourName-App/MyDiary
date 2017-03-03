var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, Pipe } from '@angular/core';
var ChineseDay = (function () {
    function ChineseDay() {
    }
    ChineseDay.prototype.transform = function (value, args) {
        if (args === 'short') {
            return value.replace('星期', '');
        }
        else if (args === 'medium') {
            return value.replace('星期', '週');
        }
        else {
            return value;
        }
    };
    return ChineseDay;
}());
ChineseDay = __decorate([
    Pipe({
        name: 'chineseDay'
    }),
    Injectable()
], ChineseDay);
export { ChineseDay };
//# sourceMappingURL=chinese-day.js.map