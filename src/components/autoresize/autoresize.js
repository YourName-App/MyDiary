var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, HostListener, ElementRef } from "@angular/core";
var Autoresize = (function () {
    function Autoresize(element) {
        this.element = element;
    }
    Autoresize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    Autoresize.prototype.ngOnInit = function () {
        this.adjust();
    };
    Autoresize.prototype.adjust = function () {
        var area = this.element.nativeElement.querySelector("textarea");
        if (area !== null && area !== undefined) {
            area.style.overflow = "hidden";
            area.style.height = "auto";
            area.style.height = area.scrollHeight + "px";
        }
    };
    return Autoresize;
}());
__decorate([
    HostListener("input", ["$event.target"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLTextAreaElement]),
    __metadata("design:returntype", void 0)
], Autoresize.prototype, "onInput", null);
Autoresize = __decorate([
    Directive({
        selector: "ion-textarea[autoresize]"
    }),
    __metadata("design:paramtypes", [ElementRef])
], Autoresize);
export { Autoresize };
//# sourceMappingURL=autoresize.js.map