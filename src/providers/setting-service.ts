import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingService {

  constructor(public storage: Storage) {
    this.storage.get('yourName').then((val) => {
      if (val === null) {
        this.storage.set('yourName', '立花 瀧');
      }
    }, (error) => {
      console.log(error);
    })

    this.storage.get('yourGender').then((val) => {
      if (val === null) {
        this.storage.set('yourGender', 'male');
      }
    }, (error) => {
      console.log(error);
    })
  }

  // Get a specific setting
  getSetting(key: string): any {
    this.storage.get(key);
  }

  // Create a new setting
  createSetting(key: string, value: any) {
    this.storage.set(key, value);
  }

  // Delete a specific setting
  deleteSetting(key: string) {
    return this.storage.remove(key);
  }
}
