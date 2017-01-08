import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { MemoEditPage } from '../memo-edit/memo-edit';
import { MemoDetailPage } from '../memo-detail/memo-detail';
import { MemoService } from '../../providers/memo-service';

@Component({
  selector: 'page-memo-list',
  templateUrl: 'memo-list.html'
})
export class MemoListPage {
  public memoList: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public memoServ: MemoService) {
    this.memoList = this.memoServ.getMemoList();
  }

  showMemoDetail(memoId: string): void {
    //this.navCtrl.push(MemoDetailPage, { memoId });
    this.modalCtrl.create(MemoDetailPage, { memoId }).present();
  }

  createMemo(): void {
    this.modalCtrl.create(MemoEditPage).present();
  }

  updateMemo(memoId: string, title: string, items: Array<string>) {
    this.navCtrl.push(MemoEditPage, { memoId, title, items });
  }

  deleteMemo(memoId: string): void {
    this.memoServ.deleteMemo(memoId);
  }
}
