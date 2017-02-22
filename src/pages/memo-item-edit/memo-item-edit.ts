import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-memo-item-edit',
  templateUrl: 'memo-item-edit.html'
})
export class MemoItemEditPage {

  theme: string;
  memo: any;
  itemList: any;
  memoId: string = '';
  entryValid: boolean = true;
  entryChanged: boolean = false;
  createMode: boolean = false;
  submitAttempt: boolean = false;
  itemBuffer = new Object();

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private viewCtrl: ViewController, private alertCtrl: AlertController,
    private memoServ: MemoService, private configServ: ConfigService) {

    this.memoServ.getMemo(this.navParams.get('memoId')).subscribe((memoSnap) => {
      this.memo = memoSnap;
    });

    this.itemList = this.memoServ.getItemList(this.navParams.get('memoId'));
    this.memoId = this.navParams.get('memoId');
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }
  
  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  bufferItem(itemId: string, item: any, entry: any): void {
    if (entry !== null && entry.value.trim().length !== 0) {
      this.itemBuffer[itemId] = {entry: entry.value, checked: item.checked};
    }
  }

  updateAllItems() {
    for (let key in this.itemBuffer) {
      this.memoServ.updateItem(this.memoId, key, this.itemBuffer[key]['entry'], this.itemBuffer[key]['checked']);
    }

    this.dismiss();
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
