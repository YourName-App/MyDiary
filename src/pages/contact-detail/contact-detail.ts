import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ContactService } from '../../providers/contact-service';
import { SMS } from 'ionic-native';

@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html'
})
export class ContactDetailPage {
  contact: any;
  contactId: string;
  smsTextChanged: boolean = false;
  smsTextValid: boolean = true;
  submitAttempt: boolean = false;
  enableSms: boolean = false;
  phone: string = '';
  smsText: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public alertCtrl: AlertController,
    public contactServ: ContactService) {

    this.contactServ.getContact(this.navParams.get('contactId')).subscribe( contactSnap => {
      this.contact = contactSnap;
    });

    this.contactId = this.navParams.get('contactId');
    this.phone = this.contact.phone;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  deleteContact(contactId: string): void {
    let confirm = this.alertCtrl.create({
      message: '確認刪除？',
      buttons: [{
        text: '確認',
        handler: () => {
          this.dismiss();
          this.contactServ.deleteContact(contactId);
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
    confirm.present();
  }

  smsChanged() {
    this.smsTextChanged = true;
  }

  toggleSms() {
    this.enableSms = !this.enableSms;
  }

  sendSms(smsText: string) {
    this.submitAttempt = true;

    if (smsText === null || smsText.trim().length === 0) {
      this.smsTextValid = false;
      return;
    }

    let options = {
      replaceLineBreaks: false,
      android: { intent: 'INTENT' }
    }

    SMS.send(this.phone, smsText, options).then(() => {
      let alert = this.alertCtrl.create({
        message: '簡訊傳送成功',
        buttons: [{
          text: '確認',
          role: 'cancel'
        }]
      });
      alert.present();
    }, (error) => {
      let alert = this.alertCtrl.create({
        message: '簡訊傳送失敗',
        buttons: [{
          text: '確認',
          role: 'cancel'
        }]
      });
      alert.present();
    });
  }

  cancelSms() {
    this.smsText = '';
    this.smsTextValid = true;
    this.enableSms = !this.enableSms;
  }
}
