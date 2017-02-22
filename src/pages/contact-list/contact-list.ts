import { Component } from '@angular/core';
import { NavController, AlertController, ItemSliding } from 'ionic-angular';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { IContact, ContactService } from '../../providers/contact-service';
import { ConfigService } from '../../providers/config-service';
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
    private contactServ: ContactService, private configServ: ConfigService) {
      
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
    let confirm = this.alertCtrl.create({
      title: '刪除聯絡人',
      message: '確認刪除？',
      buttons: [{
        text: '確認',
        handler: () => {
          this.contactServ.deleteContact(contactId);
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
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
