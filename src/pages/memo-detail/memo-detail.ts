import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MemoItemEditPage } from '../memo-item-edit/memo-item-edit';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';

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
    this.navCtrl.push(MemoItemEditPage, { memoId: this.memoId });
  }

  deleteItem(itemId: string): void {
    this.memoServ.deleteItem(this.memoId, itemId);
  }

  deleteAllItems(): void {
    let options = {
      title: '',
      message: '',
      buttons: [{
        text: '',
        handler: () => {
          let deleteEvent = this.itemList.subscribe(itemSnaps => {
            itemSnaps.forEach(item => {
              this.deleteItem(item.$key);
            });
          });

          deleteEvent.unsubscribe();
        }
      }, {
        text: '',
        role: 'cancel'
      }]
    }
    this.localeServ.localize('MEMO_DETAIL.DELETE.TITLE',   (value:string) => { options.title = value; });
    this.localeServ.localize('MEMO_DETAIL.DELETE.MESSAGE', (value:string) => { options.message = value; });
    this.localeServ.localize('MEMO_DETAIL.DELETE.CONFIRM', (value:string) => { options.buttons[0].text = value; });
    this.localeServ.localize('MEMO_DETAIL.DELETE.CANCEL',  (value:string) => { options.buttons[1].text = value; });

    let confirm = this.alertCtrl.create(options);
    confirm.present();
  }
}
