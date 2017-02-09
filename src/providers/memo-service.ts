import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class MemoService {

  memoList: FirebaseListObservable<any>;
  itemList: FirebaseListObservable<any>;
  memoDetail: FirebaseObjectObservable<any>;
  userId: string;


  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.memoList = af.database.list(`/userProfile/${auth.uid}/memoList`);
        this.userId = auth.uid;
      }
    });
  }

  // Get the full list of memos
  getMemoList() {
    return this.memoList;
  }

  // Get a specific memo from the list
  getMemo(memoId: string) {
    return this.memoDetail = 
      this.af.database.object(`/userProfile/${this.userId}/memoList/${memoId}`);
  }

  // Create a new memo
  createMemo(title: string) {
    return this.memoList.push({title});
  }

  // Update an existing memo
  updateMemo(memoId: string, title: string,) {
    return this.memoList.update(memoId, {title});
  }

  // Delete an existing memo
  deleteMemo(memoId: string) {
    return this.memoList.remove(memoId);
  }

  // Get the full list of items
  getItemList(memoId: string) {
    return this.itemList = 
      this.af.database.list(`/userProfile/${this.userId}/memoList/${memoId}/itemList`);
  }

  // Get a specific item from the list
  getItem(memoId: string, itemId: string) {
    return this.memoDetail = 
      this.af.database.object(`/userProfile/${this.userId}/memoList/${memoId}/itemList/${itemId}`);
  }

  // Create a new memo item
  createItem(memoId: string, item: any) {
    return this.af.database.list(`/userProfile/${this.userId}/memoList/${memoId}/itemList`).push(item);
  }

  // Update an existing memo item
  updateItem(memoId: string, itemId: string, entry: string, checked?: boolean) {
    return this.af.database.list(`/userProfile/${this.userId}/memoList/${memoId}/itemList`)
      .update(itemId, {entry, checked});
  }

  // Delete an existing memo item
  deleteItem(memoId: string, itemId: string) {
    return this.af.database.list(`/userProfile/${this.userId}/memoList/${memoId}/itemList`).remove(itemId);
  }
}
