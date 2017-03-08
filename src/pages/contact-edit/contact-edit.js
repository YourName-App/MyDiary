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
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../providers/contact-service';
import { ConfigService } from '../../providers/config-service';
import { Contacts } from 'ionic-native';
import { LocaleService } from '../../providers/locale-service';
var ContactEditPage = (function () {
    function ContactEditPage(navParams, viewCtrl, contactServ, formBuilder, configServ, localeServ) {
        var _this = this;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.contactServ = contactServ;
        this.formBuilder = formBuilder;
        this.configServ = configServ;
        this.localeServ = localeServ;
        this.contactId = '';
        this.inputName = '';
        this.inputPhone = '';
        this.inputAvatar = '';
        this.mode = '';
        this.modeDesc = '';
        this.nameChanged = false;
        this.submitAttempt = false;
        this.contactId = this.navParams.get('contactId') || '';
        this.inputContact = this.navParams.get('contact') || {};
        this.inputName = this.inputContact.name || '';
        this.inputPhone = this.inputContact.phone || '';
        this.inputAvatar = this.inputContact.avatar || '';
        this.contactForm = formBuilder.group({
            name: ['', Validators.required],
            phone: ['', Validators.required]
        });
        if (this.contactId) {
            this.mode = 'update';
            this.localeServ.subscribe('CONTACT_EDIT.TITLE_UPDATE', function (value) { _this.modeDesc = value; });
            this.contactForm.controls['name'].patchValue(this.inputName);
            this.contactForm.controls['phone'].patchValue(this.inputPhone);
        }
        else {
            this.mode = 'create';
            this.localeServ.subscribe('CONTACT_EDIT.TITLE_CREATE', function (value) { _this.modeDesc = value; });
        }
    }
    ContactEditPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    ContactEditPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    ContactEditPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ContactEditPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    ContactEditPage.prototype.editContact = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.contactForm.valid) {
            console.log(this.contactForm.value);
        }
        else {
            var contact = {
                name: this.contactForm.value.name,
                phone: this.contactForm.value.phone,
                avatar: this.contactForm.value.avatar || 'assets/img/avatar-contact.png'
            };
            if (this.mode === 'create') {
                this.contactServ.createContact(contact)
                    .then(function () { _this.dismiss(); }, function (error) { console.log(error); });
            }
            else if (this.mode === 'update') {
                this.contactServ.updateContact(this.contactId, contact)
                    .then(function () { _this.dismiss(); }, function (error) { console.log(error); });
            }
        }
    };
    ContactEditPage.prototype.pickContact = function () {
        var _this = this;
        Contacts.pickContact()
            .then(function (contact) {
            _this.contactForm.controls['name'].patchValue(contact.displayName);
            _this.contactForm.controls['phone'].patchValue(contact.phoneNumbers[0].value);
        })
            .catch(function (error) {
            // Ignore; user didn't select a contact
        });
    };
    return ContactEditPage;
}());
ContactEditPage = __decorate([
    Component({
        selector: 'page-contact-edit',
        templateUrl: 'contact-edit.html'
    }),
    __metadata("design:paramtypes", [NavParams, ViewController,
        ContactService, FormBuilder,
        ConfigService,
        LocaleService])
], ContactEditPage);
export { ContactEditPage };
//# sourceMappingURL=contact-edit.js.map