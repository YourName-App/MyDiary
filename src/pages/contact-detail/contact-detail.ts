import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ContactService } from '../../providers/contact-service';

@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html'
})
export class ContactDetailPage {
  public contact: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public contactServ: ContactService) {

    this.contactServ.getContact(this.navParams.get('contactId')).subscribe( contactSnap => {
      this.contact = contactSnap;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
