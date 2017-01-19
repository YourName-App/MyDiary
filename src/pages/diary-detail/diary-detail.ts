import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { IDiary, DiaryService } from '../../providers/diary-service';
import { DiaryEditPage } from '../diary-edit/diary-edit';

@Component({
  selector: 'page-diary-detail',
  templateUrl: 'diary-detail.html'
})
export class DiaryDetailPage {

  diary: any;
  diaryId: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public alertCtrl: AlertController,
    public modalCtrl: ModalController, public diaryServ: DiaryService) {

    this.diaryServ.getDiary(this.navParams.get('diaryId')).subscribe((diarySnap) => {
      this.diary = diarySnap;
    });

    this.diaryId = this.navParams.get('diaryId');
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  updateDiary(diaryId: string, diary: IDiary): void {
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
          this.dismiss();
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    
    confirm.present();
  }
}
