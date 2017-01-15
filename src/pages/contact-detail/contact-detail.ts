import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { ContactService } from '../../providers/contact-service';
import { CallNumber, SocialSharing } from 'ionic-native';
import { ContactEditPage } from '../contact-edit/contact-edit';

@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html'
})
export class ContactDetailPage {
  contact: any;
  contactId: string;
  phone: string = '';
  smsMsg: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public alertCtrl: AlertController,
    public modalCtrl: ModalController, public contactServ: ContactService) {

    this.contactServ.getContact(this.navParams.get('contactId')).subscribe((contactSnap) => {
      this.contact = contactSnap;
    });

    this.contactId = this.navParams.get('contactId');
    this.phone = this.contact.phone;
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  updateContact(contactId: string, name: string, phone: string, avatar?: string): void {
    this.modalCtrl.create(ContactEditPage, {contactId, name, phone, avatar}).present();
  }

  deleteContact(contactId: string): void {
    let confirm = this.alertCtrl.create({
      title: '刪除聯絡人',
      message: '確認刪除？',
      buttons: [{
        text: '確認',
        handler: () => {
          this.contactServ.deleteContact(contactId);
          this.dismiss();
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
    confirm.present();
  }

  sendSms(): void {
    SocialSharing.shareViaSMS(this.smsMsg, this.phone);
  }

  dial(): void {
    CallNumber.callNumber(this.phone, true);
  }
}
