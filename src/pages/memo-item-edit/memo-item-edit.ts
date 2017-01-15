import { EntryPage } from './../../../.tmp/pages/entry/entry';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { MemoService } from '../../providers/memo-service';

@Component({
  selector: 'page-memo-item-edit',
  templateUrl: 'memo-item-edit.html'
})
export class MemoItemEditPage {
  memo: any;
  itemList: any;
  memoId: string = '';
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

  updateItem(itemId: string, item: any, entry: any): void {
    if (entry === null || entry.value.trim().length === 0) {
      return;
    } else {
      this.memoServ.updateItem(this.memoId, itemId, entry.value, item.checked);
    }
  }

  deleteItem(itemId: string): void {
    let confirm = this.alertCtrl.create({
      title: '刪除備忘錄項目',
      message: '確認刪除？',
      buttons: [{
        text: '確認',
        handler: () => {
          this.memoServ.deleteItem(this.memoId, itemId);
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
    confirm.present();
  }
}
