import { Component, Input } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { IDiary, DiaryService } from '../../providers/diary-service';
import { DiaryEditPage } from '../diary-edit/diary-edit';
import { DiaryDetailPage } from '../diary-detail/diary-detail';

@Component({
  selector: 'page-diary-list',
  templateUrl: 'diary-list.html'
})
export class DiaryListPage {

  _diaryList: any;


  @Input()
  set diaryList(diaryList: any) {
    this._diaryList = diaryList;
  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public modalCtrl: ModalController, public diaryServ: DiaryService) {}

  showDiaryDetail(diaryId: string): void {
    this.modalCtrl.create(DiaryDetailPage, {diaryId}).present();
  }

  createDiary(): void {
    this.modalCtrl.create(DiaryEditPage).present();
  }

  updateDiary(diaryId: string, diary: IDiary) {
    this.modalCtrl.create(DiaryEditPage, {diaryId, diary}).present();
  }

  deleteDiary(diaryId: string): void {
    let confirm = this.alertCtrl.create({
      title: '刪除日記',
      message: '確認刪除？',
      buttons: [{
        text: '確認',
        handler: () => {
          this.diaryServ.deleteDiary(diaryId);
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
    confirm.present();
  }
}
