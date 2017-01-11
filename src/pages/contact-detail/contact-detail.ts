import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ContactService } from '../../providers/contact-service';

@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html'
})
export class ContactDetailPage {
  contact: any;
  contactId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public alertCtrl: AlertController,
    public contactServ: ContactService) {

    this.contactId = this.navParams.get('contactId');
    this.contactServ.getContact(this.navParams.get('contactId')).subscribe( contactSnap => {
      this.contact = contactSnap;
    });
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
}
