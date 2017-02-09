import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DiaryEditPage } from '../diary-edit/diary-edit';
import { DiaryService } from '../../providers/diary-service';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})
export class DiaryPage {

  theme: string;
  segment: string;
  diaryList: any;


  constructor(private navCtrl: NavController, private modalCtrl: ModalController,
    private diaryServ: DiaryService, private configServ: ConfigService) {

    this.segment = 'diary-list';
    this.initializeDiary();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }

  initializeDiary() {
    this.diaryList = this.diaryServ.getDiaryList();
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  createDiary(): void {
    this.modalCtrl.create(DiaryEditPage).present();
  }

  searchDiary(ev) {
    this.initializeDiary();
    let targetVal = ev.target.value;

    if (targetVal && targetVal.trim() != '') {
      this.diaryList = this.diaryList.map((diaries) => {
        let result = diaries.filter(
          diary => diary.title.toLowerCase().indexOf(targetVal.toLowerCase()) > -1 ||
                   diary.content.toLowerCase().indexOf(targetVal.toLowerCase()) > -1 ||
                   diary.timestamp.substring(0, 4) === targetVal ||
                   diary.timestamp.substring(0, 7) === targetVal ||
                   diary.timestamp.substring(0, 10) === targetVal
        );
        
        return result;
      })
    }
  }
}
