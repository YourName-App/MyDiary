import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { IContact, ContactService } from '../../providers/contact-service';
import { ConfigService } from '../../providers/config-service';
import { CallNumber } from 'ionic-native';
import { SocialSharing } from 'ionic-native';
import { LocaleService } from '../../providers/locale-service';

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
    private contactServ: ContactService, private configServ: ConfigService,
    private localeServ: LocaleService) {

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
    let options = {
      title: '',
      message: '',
      buttons: [{
        text: '',
        handler: () => {
          this.contactServ.deleteContact(contactId);
          this.dismiss();
        }
      }, {
        text: '',
        role: 'cancel'
      }]
    };

    this.localeServ.localize('CONTACT_DETAIL.DELETE.TITLE',   (value:string) => { options.title = value; });
    this.localeServ.localize('CONTACT_DETAIL.DELETE.MESSAGE', (value:string) => { options.message = value; });
    this.localeServ.localize('CONTACT_DETAIL.DELETE.CONFIRM', (value:string) => { options.buttons[0].text = value; });
    this.localeServ.localize('CONTACT_DETAIL.DELETE.CANCEL',  (value:string) => { options.buttons[1].text = value; });

    let confirm = this.alertCtrl.create(options);
    confirm.present();
  }

  sendSms(phone: string): void {
    SocialSharing.shareViaSMS(this.smsMsg, phone);
  }

  dial(phone: string): void {
    CallNumber.callNumber(phone, true);
  }
}
