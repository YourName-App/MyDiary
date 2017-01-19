import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

export interface IContact {
  name: string;
  phone: string;
  avatar?: string;
}

@Injectable()
export class ContactService {

  contactList: FirebaseListObservable<any>;
  contactDetail: FirebaseObjectObservable<any>;
  userId: string;


  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.contactList = af.database.list(`/userProfile/${auth.uid}/contactList`);
        this.userId = auth.uid;
      }
    });
  }

  // Get the full list of contacts
  getContactList() {
    return this.contactList;
  }

  // Get a specific contact from the list
  getContact(contactId: string) {
    return this.contactDetail = 
      this.af.database.object(`/userProfile/${this.userId}/contactList/${contactId}`);
  }

  // Create a new contact
  createContact(contact: IContact) {
    return this.contactList.push(contact);
  }

  // Update an existing contact
  updateContact(contactId: string, contact: IContact) {
    return this.contactList.update(contactId, contact);
  }

  // Delete an existing contact
  deleteContact(contactId: string) {
    return this.contactList.remove(contactId);
  }
}
