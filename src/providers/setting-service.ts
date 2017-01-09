import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class SettingService {
  settingList: FirebaseListObservable<any>;
  settingDetail: FirebaseObjectObservable<any>;
  userId: string;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.settingList = af.database.list(`/userProfile/${auth.uid}/settingList`);
        this.userId = auth.uid;
      }
    });
  }

  // Get the full list of settings
  getSettingList() {
    return this.settingList;
  }

  // Get a specific setting from the list
  getSetting(settingId: string) {
    return this.settingDetail = 
      this.af.database.object(`/userProfile/${this.userId}/settingList/${settingId}`);
  }

  // Create a new setting
  createSetting(name: string, gender: string) {
    return this.settingList.push({name, gender});
  }

  // Update an existing setting
  updateSetting(settingId: string, name: string, gender: string) {
    return this.settingList.update(settingId, {name, gender});
  }

  // Delete an existing setting
  deleteSetting(settingId: string) {
    return this.settingList.remove(settingId);
  }
}
