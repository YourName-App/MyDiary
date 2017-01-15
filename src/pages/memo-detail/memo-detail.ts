import { MemoItemEditPage } from './../memo-item-edit/memo-item-edit';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { MemoService } from '../../providers/memo-service';

@Component({
  selector: 'page-memo-detail',
  templateUrl: 'memo-detail.html'
})
export class MemoDetailPage {
  memo: any;
  itemList: any;
  memoId: string = '';
  entry: string = '';
  entryValid: boolean = true;
  entryChanged: boolean = false;
  createMode: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public alertCtrl: AlertController,
    public memoServ: MemoService) {

    this.memoServ.getMemo(this.navParams.get('memoId')).subscribe((memoSnap) => {
      this.memo = memoSnap;
    });

    this.itemList = this.memoServ.getItemList(this.navParams.get('memoId'));
    this.memoId = this.navParams.get('memoId');
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  toggleCreateMode(): void {
    this.createMode = !this.createMode;
  }

  reset(): void {
    this.createMode = !this.createMode;
    this.entryValid = true;
    this.entry = '';
  }

  entryChange(): void {
    this.entryChanged = true;

    if (this.entry.trim().length === 0) {
      this.entryValid = false;
    } else {
      this.entryValid = true;
    }  
  }

  createItem(): void {
    this.submitAttempt = true;

    if (this.entry.trim().length === 0) {
      this.entryValid = false;
    } else {
      this.entryValid = true;
      this.memoServ.createItem(this.memoId, {entry: this.entry, checked: false});
      this.entry = '';
    } 
  }

  deleteItem(itemId: string): void {
    this.memoServ.deleteItem(this.memoId, itemId);
  }

  deleteAllItems(): void {
    let confirm = this.alertCtrl.create({
      title: '刪除所有備忘錄項目',
      message: '確認刪除？',
      buttons: [{
        text: '確認',
        handler: () => {
          this.itemList.subscribe(itemSnaps => {
            itemSnaps.forEach(item => {
              this.deleteItem(item.$key);
            });
          });
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
    confirm.present();
  }

  toggleItem(key: string, item: any): void {
    this.memoServ.updateItem(this.memoId, key, {entry: item.entry, checked: !item.checked});
  }
}
