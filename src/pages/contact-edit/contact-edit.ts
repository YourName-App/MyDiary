import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../providers/contact-service';

@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html'
})
export class ContactEditPage {
  contactForm: any;
  contactTitle: string = '';
  contactId: string = '';
  inputName: string = '';
  inputPhone: string = '';
  mode: string = '';
  nameChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public contactServ: ContactService,
    public formBuilder: FormBuilder) {

    this.contactId = this.navParams.get('contactId') || '';
    this.inputName = this.navParams.get('name') || '';
    this.inputPhone = this.navParams.get('phone') || '';

    this.contactForm = formBuilder.group({
       name: ['', Validators.required],
       phone: ['', Validators.required]
    });

    if (this.contactId) {
      this.mode = 'update';
      this.contactTitle = '編輯聯絡人';
      this.contactForm.controls['name'].patchValue(this.inputName);
      this.contactForm.controls['phone'].patchValue(this.inputPhone);
    } else {
      this.mode = 'create';
      this.contactTitle = '新增聯絡人';
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  elementChanged(input) {
     let field = input.inputControl.name;
     this[field + "Changed"] = true;
  }

  editContact() {
    this.submitAttempt = true;

    if (!this.contactForm.valid) {
      console.log(this.contactForm.value);
    } else {
      if (this.mode === 'create') {
        this.contactServ.createContact(
          this.contactForm.value.name, 
          this.contactForm.value.phone,
          this.contactForm.value.avatar || 'assets/img/avatar-female.png'
        ).then(
          () => {this.dismiss();}, 
          error => {console.log(error);}
        );
      } else if (this.mode === 'update') {
        this.contactServ.updateContact(
          this.contactId,
          this.contactForm.value.name, 
          this.contactForm.value.phone,
          this.contactForm.value.avatar || 'assets/img/avatar-female.png'
        ).then(
          () => {this.dismiss();}, 
          error => {console.log(error);}
        );
      }
    } 
  }
}
