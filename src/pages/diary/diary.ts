import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DiaryEditPage } from '../diary-edit/diary-edit';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})
export class DiaryPage {

  segment: string;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.segment = 'diary-list';
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  createDiary(): void {
    this.modalCtrl.create(DiaryEditPage).present();
  }
}
