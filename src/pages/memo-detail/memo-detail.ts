import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { MemoItemEditPage } from '../memo-item-edit/memo-item-edit';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-memo-detail',
  templateUrl: 'memo-detail.html'
})
export class MemoDetailPage {

  theme: string;
  memo: any;
  itemList: any;
  memoId: string = '';
  entry: string = '';
  entryValid: boolean = true;
  entryChanged: boolean = false;
  createMode: boolean = false;
  submitAttempt: boolean = false;


  constructor(private navCtrl: NavController, private navParams: NavParams, 
    private viewCtrl: ViewController, private alertCtrl: AlertController,
    private modalCtrl: ModalController, private memoServ: MemoService,
    private configServ: ConfigService) {

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

  toggleItem(itemId: string, item: any): void {
    this.memoServ.updateItem(this.memoId, itemId, item.entry, !item.checked);
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

  updateItem(): void {
    this.modalCtrl.create(MemoItemEditPage, { memoId: this.memoId }).present();
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
          let deleteEvent = this.itemList.subscribe(itemSnaps => {
            itemSnaps.forEach(item => {
              this.deleteItem(item.$key);
            });
          });

          deleteEvent.unsubscribe();
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
    confirm.present();
  }
}
