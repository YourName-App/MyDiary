import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../providers/contact-service';

@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html'
})
export class ContactEditPage {
  public contactForm;
  contactTitle: string;
  nameChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public contactServ: ContactService,
    public formBuilder: FormBuilder) {

    if (this.navParams.get('name')) {
      this.contactTitle = '編輯聯絡人';
    } else {
      this.contactTitle = '新增聯絡人';
    }

    this.contactForm = formBuilder.group({
       name: ['', Validators.required],
       phone: ['', Validators.required]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  elementChanged(input) {
     let field = input.inputControl.name;
     this[field + "Changed"] = true;
  }

  createContact() {
    this.submitAttempt = true;

    if (!this.contactForm.valid) {
      console.log(this.contactForm.value);
    } else {
      this.contactServ.createContact(
        this.contactForm.value.name, 
        this.contactForm.value.phone,
        this.contactForm.value.avatar || 'assets/img/avatar-female.png'
      ).then( () => {
        this.dismiss();
      }, error => {
        console.log(error);
      });
    } 
  }
}
