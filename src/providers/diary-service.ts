import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
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

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.diaryList = this.afDatabase.list(`/userProfile/${auth.uid}/diaryList`);
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
      this.afDatabase.object(`/userProfile/${this.userId}/diaryList/${diaryId}`);
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
