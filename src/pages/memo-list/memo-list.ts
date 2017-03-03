import { Component } from '@angular/core';
import { NavController, AlertController, ItemSliding } from 'ionic-angular';
import { MemoEditPage } from '../memo-edit/memo-edit';
import { MemoDetailPage } from '../memo-detail/memo-detail';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';

@Component({
  selector: 'page-memo-list',
  templateUrl: 'memo-list.html'
})
export class MemoListPage {

  theme: string;
  memoList: any;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController,
    private memoServ: MemoService, private configServ: ConfigService,
    private localeServ: LocaleService) {

    this.initializeMemo();
  }

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }

  initializeMemo() {
    this.memoList = this.memoServ.getMemoList();
  }

  showMemoDetail(memoId: string): void {
    this.navCtrl.push(MemoDetailPage, {memoId});
  }

  createMemo(): void {
    this.navCtrl.push(MemoEditPage);
  }

  updateMemo(memoId: string, title: string, slidingItem: ItemSliding) {
    this.navCtrl.push(MemoEditPage, {memoId, title});
    slidingItem.close();
  }

  deleteMemo(memoId: string, slidingItem: ItemSliding): void {
    let options = {
      title: '',
      message: '',
      buttons: [{
        text: '',
        handler: () => {
          this.memoServ.deleteMemo(memoId);
        }
      }, {
        text: '',
        role: 'cancel'
      }]
    };

    this.localeServ.localize('MEMO_LIST.DELETE.TITLE',   (value:string) => { options.title = value; });
    this.localeServ.localize('MEMO_LIST.DELETE.MESSAGE', (value:string) => { options.message = value; });
    this.localeServ.localize('MEMO_LIST.DELETE.CONFIRM', (value:string) => { options.buttons[0].text = value; });
    this.localeServ.localize('MEMO_LIST.DELETE.CANCEL',  (value:string) => { options.buttons[1].text = value; });

    let confirm = this.alertCtrl.create(options);
    confirm.present();
    slidingItem.close();
  }

  searchMemo(ev) {
    this.initializeMemo();
    let targetVal = ev.target.value;

    if (targetVal && targetVal.trim() != '') {
      this.memoList = this.memoList.map((memos) => {
        let result = memos.filter(
          memo => memo.title.toLowerCase().indexOf(targetVal.toLowerCase()) > -1
        );

        return result;
      })
    }
  }
}
