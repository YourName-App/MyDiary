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
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { ContactService } from '../../providers/contact-service';
import { ConfigService } from '../../providers/config-service';
import { CallNumber } from 'ionic-native';
import { SocialSharing } from 'ionic-native';
var ContactDetailPage = (function () {
    function ContactDetailPage(navCtrl, navParams, viewCtrl, alertCtrl, contactServ, configServ) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.contactServ = contactServ;
        this.configServ = configServ;
        this.phone = '';
        this.smsMsg = '';
        this.contactServ.getContact(this.navParams.get('contactId')).subscribe(function (contactSnap) {
            _this.contact = contactSnap;
        });
        this.contactId = this.navParams.get('contactId');
        this.phone = this.contact.phone;
    }
    ContactDetailPage.prototype.ionViewCanEnter = function () {
        return this.configServ.unlockScreen();
    };
    ContactDetailPage.prototype.ionViewWillEnter = function () {
        this.theme = this.configServ.getUserGender();
    };
    ContactDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ContactDetailPage.prototype.updateContact = function (contactId, contact) {
        this.navCtrl.push(ContactEditPage, { contactId: contactId, contact: contact });
    };
    ContactDetailPage.prototype.deleteContact = function (contactId) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '刪除聯絡人',
            message: '確認刪除？',
            buttons: [{
                    text: '確認',
                    handler: function () {
                        _this.contactServ.deleteContact(contactId);
                        _this.dismiss();
                    }
                }, {
                    text: '取消',
                    role: 'cancel'
                }]
        });
        confirm.present();
    };
    ContactDetailPage.prototype.sendSms = function (phone) {
        SocialSharing.shareViaSMS(this.smsMsg, phone);
    };
    ContactDetailPage.prototype.dial = function (phone) {
        CallNumber.callNumber(phone, true);
    };
    return ContactDetailPage;
}());
ContactDetailPage = __decorate([
    Component({
        selector: 'page-contact-detail',
        templateUrl: 'contact-detail.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        ViewController, AlertController,
        ContactService, ConfigService])
], ContactDetailPage);
export { ContactDetailPage };
//# sourceMappingURL=contact-detail.js.map