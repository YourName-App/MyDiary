import { Component } from '@angular/core';
import { NavController, AlertController, ItemSliding } from 'ionic-angular';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { IContact, ContactService } from '../../providers/contact-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html'
})
export class ContactListPage {

  theme: string;
  contactList: any;
  contactCount: number;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController,
    private contactServ: ContactService, private configServ: ConfigService,
    private localeServ:LocaleService) {
    this.initializeContact();
  }

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }

  initializeContact() {
    this.contactList = this.contactServ.getContactList();
  }

  showContactDetail(contactId: string): void {
    this.navCtrl.push(ContactDetailPage, {contactId});
  }

  createContact(): void {
    this.navCtrl.push(ContactEditPage);
  }

  updateContact(contactId: string, contact: IContact, slidingItem: ItemSliding) {
    this.navCtrl.push(ContactEditPage, {contactId, contact});
    slidingItem.close();
  }

  deleteContact(contactId: string, slidingItem: ItemSliding): void {
    let options = {
      title: '',
      message: '',
      buttons: [{
        text: '',
        handler: () => {
          this.contactServ.deleteContact(contactId);
        }
      }, {
        text: '',
        role: 'cancel'
      }]
    };

    this.localeServ.localize('CONTACT_LIST.DELETE.TITLE',   (value:string) => { options.title = value; });
    this.localeServ.localize('CONTACT_LIST.DELETE.MESSAGE', (value:string) => { options.message = value; });
    this.localeServ.localize('CONTACT_LIST.DELETE.CONFIRM', (value:string) => { options.buttons[0].text = value; });
    this.localeServ.localize('CONTACT_LIST.DELETE.CANCEL',  (value:string) => { options.buttons[1].text = value; });

    let confirm = this.alertCtrl.create(options);
    confirm.present();
    slidingItem.close();
  }

  searchContact(ev) {
    this.initializeContact();
    let targetVal = ev.target.value;

    if (targetVal && targetVal.trim() != '') {
      this.contactList = this.contactList.map((contacts) => {
        let result = contacts.filter(
          contact => contact.name.toLowerCase().indexOf(targetVal.toLowerCase()) > -1 ||
                     contact.phone.indexOf(targetVal) > -1 
        );

        return result;
      })
    }
  }
}
