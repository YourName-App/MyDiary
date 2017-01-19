import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { IContact, ContactService } from '../../providers/contact-service';
import { CallNumber, SocialSharing } from 'ionic-native';

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

  updateContact(contactId: string, contact: IContact): void {
    this.modalCtrl.create(ContactEditPage, {contactId, contact}).present();
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

  sendSms(phone: string): void {
    SocialSharing.shareViaSMS(this.smsMsg, phone);
  }

  dial(phone: string): void {
    CallNumber.callNumber(phone, true);
  }
}
