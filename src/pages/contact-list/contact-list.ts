import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { IContact, ContactService } from '../../providers/contact-service';

@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html'
})
export class ContactListPage {
  
  public contactList: any;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public modalCtrl: ModalController, public contactServ: ContactService) {
      
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
}
