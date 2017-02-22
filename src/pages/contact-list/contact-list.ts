import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, ItemSliding } from 'ionic-angular';
import { PinDialog } from 'ionic-native';
import { ContactEditPage } from '../contact-edit/contact-edit';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { HomePage } from '../home/home';
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
    private modalCtrl: ModalController, private contactServ: ContactService,
    private configServ: ConfigService) {
      
    this.initializeContact();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();

    if (this.configServ.getPauseEmitted && this.configServ.getUserPin.length >= 4) {
      PinDialog.prompt('請輸入密碼', '解除密碼鎖', ['確認', '取消'])
      .then((result: any) => {
        if (result.buttonIndex === 1) {
          if (result.input1 === this.configServ.getUserPin()) {
            this.configServ.setPauseEmitted(false);
          } else {
            this.navCtrl.setRoot(HomePage);
          }
        } else {
          this.navCtrl.setRoot(HomePage);
        }
      });
    }
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
