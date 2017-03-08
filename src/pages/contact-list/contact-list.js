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
import { NavController, AlertController } from 'ionic-angular';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { ContactService } from '../../providers/contact-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
var ContactListPage = (function () {
    function ContactListPage(navCtrl, alertCtrl, contactServ, configServ, localeServ) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.contactServ = contactServ;
        this.configServ = configServ;
        this.localeServ = localeServ;
        this.initializeContact();
    }
    ContactListPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    ContactListPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    ContactListPage.prototype.initializeContact = function () {
        this.contactList = this.contactServ.getContactList();
    };
    ContactListPage.prototype.showContactDetail = function (contactId) {
        this.navCtrl.push(ContactDetailPage, { contactId: contactId });
    };
    ContactListPage.prototype.createContact = function () {
        this.navCtrl.push(ContactEditPage);
    };
    ContactListPage.prototype.updateContact = function (contactId, contact, slidingItem) {
        this.navCtrl.push(ContactEditPage, { contactId: contactId, contact: contact });
        slidingItem.close();
    };
    ContactListPage.prototype.deleteContact = function (contactId, slidingItem) {
        var _this = this;
        var options = {
            title: '',
            message: '',
            buttons: [{
                    text: '',
                    handler: function () {
                        _this.contactServ.deleteContact(contactId);
                    }
                }, {
                    text: '',
                    role: 'cancel'
                }]
        };
        this.localeServ.localize('CONTACT_LIST.DELETE.TITLE', function (value) { options.title = value; });
        this.localeServ.localize('CONTACT_LIST.DELETE.MESSAGE', function (value) { options.message = value; });
        this.localeServ.localize('CONTACT_LIST.DELETE.CONFIRM', function (value) { options.buttons[0].text = value; });
        this.localeServ.localize('CONTACT_LIST.DELETE.CANCEL', function (value) { options.buttons[1].text = value; });
        var confirm = this.alertCtrl.create(options);
        confirm.present();
        slidingItem.close();
    };
    ContactListPage.prototype.searchContact = function (ev) {
        this.initializeContact();
        var targetVal = ev.target.value;
        if (targetVal && targetVal.trim() != '') {
            this.contactList = this.contactList.map(function (contacts) {
                var result = contacts.filter(function (contact) { return contact.name.toLowerCase().indexOf(targetVal.toLowerCase()) > -1 ||
                    contact.phone.indexOf(targetVal) > -1; });
                return result;
            });
        }
    };
    return ContactListPage;
}());
ContactListPage = __decorate([
    Component({
        selector: 'page-contact-list',
        templateUrl: 'contact-list.html'
    }),
    __metadata("design:paramtypes", [NavController, AlertController,
        ContactService, ConfigService,
        LocaleService])
], ContactListPage);
export { ContactListPage };
//# sourceMappingURL=contact-list.js.map