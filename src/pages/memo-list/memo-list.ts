import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { MemoEditPage } from '../memo-edit/memo-edit';
import { MemoDetailPage } from '../memo-detail/memo-detail';
import { MemoService } from '../../providers/memo-service';

@Component({
  selector: 'page-memo-list',
  templateUrl: 'memo-list.html'
})
export class MemoListPage {
  public memoList: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public modalCtrl: ModalController, public memoServ: MemoService) {

    this.memoList = this.memoServ.getMemoList();
  }

  showMemoDetail(memoId: string): void {
    this.modalCtrl.create(MemoDetailPage, {memoId}).present();
  }

  createMemo(): void {
    this.modalCtrl.create(MemoEditPage).present();
  }

  updateMemo(memoId: string, title: string) {
    this.modalCtrl.create(MemoEditPage, {memoId, title}).present();
  }

  deleteMemo(memoId: string): void {
    let confirm = this.alertCtrl.create({
      title: '刪除備忘錄',
      message: '確認刪除？',
      buttons: [{
        text: '確認',
        handler: () => {
          this.memoServ.deleteMemo(memoId);
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
    confirm.present();
  }
}
