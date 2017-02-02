import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { IDiary } from '../models/diary';

export interface IDiary {
  ".priority": any;
  timestamp: string;
  year: string;
  month: string;
  day: string;
  date: string;
  time: string;
  title: string;
  content: string;
  mood?: string;
  weather?: string;
  location?: any;
  tag?: Array<any>;
  photo?: Array<any>;
}

@Injectable()
export class DiaryService {

  diaryList: FirebaseListObservable<any>;
  diaryDetail: FirebaseObjectObservable<any>;
  userId: string;


  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.diaryList = af.database.list(`/userProfile/${auth.uid}/diaryList`);
        this.userId = auth.uid;
      }
    });
  }

  // Get the full list of contacts
  getDiaryList() {
    return this.diaryList;
  }

  // Get a specific contact from the list
  getDiary(diaryId: string) {
    return this.diaryDetail = 
      this.af.database.object(`/userProfile/${this.userId}/diaryList/${diaryId}`);
  }

  // Create a new contact
  createDiary(diary: IDiary) {
    return this.diaryList.push(diary);
  }

  // Update an existing contact
  updateDiary(diaryId: string, diary: IDiary) {
    return this.diaryList.update(diaryId, diary);
  }

  // Delete an existing contact
  deleteDiary(diaryId: string) {
    return this.diaryList.remove(diaryId);
  }
}
