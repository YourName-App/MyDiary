import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DiaryService } from '../../providers/diary-service';
import { DiaryEditPage } from '../diary-edit/diary-edit';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})
export class DiaryPage {

  segment: string;
  public diaryList: any;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
              public diaryServ: DiaryService) {

    this.segment = 'diary-list';
    this.initializeDiary();
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
