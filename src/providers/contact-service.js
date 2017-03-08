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
var ContactService = (function () {
    function ContactService(af) {
        var _this = this;
        this.af = af;
        this.af.auth.subscribe(function (auth) {
            if (auth) {
                _this.contactList = af.database.list("/userProfile/" + auth.uid + "/contactList");
                _this.userId = auth.uid;
            }
        });
    }
    // Get the full list of contacts
    ContactService.prototype.getContactList = function () {
        return this.contactList;
    };
    // Get a specific contact from the list
    ContactService.prototype.getContact = function (contactId) {
        return this.contactDetail =
            this.af.database.object("/userProfile/" + this.userId + "/contactList/" + contactId);
    };
    // Create a new contact
    ContactService.prototype.createContact = function (contact) {
        return this.contactList.push(contact);
    };
    // Update an existing contact
    ContactService.prototype.updateContact = function (contactId, contact) {
        return this.contactList.update(contactId, contact);
    };
    // Delete an existing contact
    ContactService.prototype.deleteContact = function (contactId) {
        return this.contactList.remove(contactId);
    };
    return ContactService;
}());
ContactService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire])
], ContactService);
export { ContactService };
//# sourceMappingURL=contact-service.js.map