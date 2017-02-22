import { Component, Input } from '@angular/core';
import { AlertController, ModalController, ItemSliding } from 'ionic-angular';
import { IDiary, DiaryService } from '../../providers/diary-service';
import { DiaryEditPage } from '../diary-edit/diary-edit';
import { DiaryDetailPage } from '../diary-detail/diary-detail';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-diary-list',
  templateUrl: 'diary-list.html'
})
export class DiaryListPage {

  _theme: string;
  _diaryList: any;

  @Input()
  set diaryList(diaryList: any) {
    this._diaryList = diaryList;
  }

  @Input()
  set theme(theme: string) {
    this._theme = theme;
  }

  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController,
    private diaryServ: DiaryService, private configServ: ConfigService) {}

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }
  
  showDiaryDetail(diaryId: string): void {
    this.modalCtrl.create(DiaryDetailPage, {diaryId}).present();
  }

  createDiary(): void {
    this.modalCtrl.create(DiaryEditPage).present();
  }

  updateDiary(diaryId: string, diary: IDiary, slidingItem: ItemSliding) {
    this.modalCtrl.create(DiaryEditPage, {diaryId, diary}).present();
    slidingItem.close();
  }

  deleteDiary(diaryId: string, slidingItem: ItemSliding): void {
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
    slidingItem.close();
  }
}
