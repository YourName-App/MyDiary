import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { IContact, ContactService } from '../../providers/contact-service';
import { ConfigService } from '../../providers/config-service';
import { CallNumber } from 'ionic-native';
import { SocialSharing } from 'ionic-native';

@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html'
})
export class ContactDetailPage {
  
  theme: string;
  contact: any;
  contactId: string;
  phone: string = '';
  smsMsg: string = '';

  constructor(private navCtrl: NavController, private navParams: NavParams, 
    private viewCtrl: ViewController, private alertCtrl: AlertController,
    private contactServ: ContactService, private configServ: ConfigService) {

    this.contactServ.getContact(this.navParams.get('contactId')).subscribe((contactSnap) => {
      this.contact = contactSnap;
    });

    this.contactId = this.navParams.get('contactId');
    this.phone = this.contact.phone;
  }
  
  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }
    
  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  updateContact(contactId: string, contact: IContact): void {
    this.navCtrl.push(ContactEditPage, {contactId, contact});
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
