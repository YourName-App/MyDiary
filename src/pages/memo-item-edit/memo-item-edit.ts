import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';

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

  constructor(private navParams: NavParams, private viewCtrl: ViewController,
    private alertCtrl: AlertController, private memoServ: MemoService,
    private configServ: ConfigService,
    private localeServ: LocaleService) {

    this.memoServ.getMemo(this.navParams.get('memoId')).subscribe((memoSnap) => {
      this.memo = memoSnap;
    });

    this.itemList = this.memoServ.getItemList(this.navParams.get('memoId'));
    this.memoId = this.navParams.get('memoId');
  }

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
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
    let options = {
      title: '',
      message: '',
      buttons: [{
        text: '',
        handler: () => {
          this.memoServ.deleteItem(this.memoId, itemId);
        }
      }, {
        text: '',
        role: 'cancel'
      }]
    };

    this.localeServ.localize('MEMO_ITEM_EDIT.DELETE.TITLE',   (value:string) => { options.title = value; });
    this.localeServ.localize('MEMO_ITEM_EDIT.DELETE.MESSAGE', (value:string) => { options.message = value; });
    this.localeServ.localize('MEMO_ITEM_EDIT.DELETE.CONFIRM', (value:string) => { options.buttons[0].text = value; });
    this.localeServ.localize('MEMO_ITEM_EDIT.DELETE.CANCEL',  (value:string) => { options.buttons[1].text = value; });

    let confirm = this.alertCtrl.create(options);
    confirm.present();
  }
}
