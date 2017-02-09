import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
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


  constructor(private navCtrl: NavController, private alertCtrl: AlertController,
    private modalCtrl: ModalController, private contactServ: ContactService,
    private configServ: ConfigService) {
      
    this.initializeContact();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }

  initializeContact() {
    this.contactList = this.contactServ.getContactList();
  }

  showContactDetail(contactId: string): void {
    this.modalCtrl.create(ContactDetailPage, {contactId}).present();
  }

  createContact(): void {
    this.modalCtrl.create(ContactEditPage).present();
  }

  updateContact(contactId: string, contact: IContact) {
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
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
    confirm.present();
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
