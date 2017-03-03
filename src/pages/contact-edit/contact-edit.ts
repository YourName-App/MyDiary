import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { IContact, ContactService } from '../../providers/contact-service';
import { ConfigService } from '../../providers/config-service';
import { Contacts } from 'ionic-native';
import { LocaleService } from '../../providers/locale-service';

@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html'
})
export class ContactEditPage {

  theme: string;
  contactForm: any;
  contactId: string = '';
  inputContact: IContact;
  inputName: string = '';
  inputPhone: string = '';
  inputAvatar: string = '';
  mode: string = '';
  modeDesc: string = '';
  nameChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(private navParams: NavParams, private viewCtrl: ViewController,
    private contactServ: ContactService, private formBuilder: FormBuilder,
    private configServ: ConfigService,
    private localeServ: LocaleService) {

    this.contactId = this.navParams.get('contactId') || '';
    this.inputContact = this.navParams.get('contact') || {};
    this.inputName = this.inputContact.name || '';
    this.inputPhone = this.inputContact.phone || '';
    this.inputAvatar = this.inputContact.avatar || '';

    this.contactForm = formBuilder.group({
       name: ['', Validators.required],
       phone: ['', Validators.required]
    });

    if (this.contactId) {
      this.mode = 'update';
      this.localeServ.subscribe('CONTACT_EDIT.TITLE_UPDATE', (value:string) => { this.modeDesc = value; })
      this.contactForm.controls['name'].patchValue(this.inputName);
      this.contactForm.controls['phone'].patchValue(this.inputPhone);
    } else {
      this.mode = 'create';
      this.localeServ.subscribe('CONTACT_EDIT.TITLE_CREATE', (value:string) => { this.modeDesc = value; })
    }
  }

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
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
      let contact: IContact = {
        name: this.contactForm.value.name,
        phone: this.contactForm.value.phone,
        avatar: this.contactForm.value.avatar || 'assets/img/avatar-contact.png'
      }

      if (this.mode === 'create') {
        this.contactServ.createContact(contact)
        .then(
          () => {this.dismiss();},
          error => {console.log(error);}
        );
      } else if (this.mode === 'update') {
        this.contactServ.updateContact(this.contactId, contact)
        .then(
          () => {this.dismiss();},
          error => {console.log(error);}
        );
      }
    }
  }

  pickContact() {
    Contacts.pickContact()
      .then(contact => {
        this.contactForm.controls['name'].patchValue(contact.displayName);
        this.contactForm.controls['phone'].patchValue(contact.phoneNumbers[0].value);
      })
      .catch(error => {
        // Ignore; user didn't select a contact
      });
  }
}
