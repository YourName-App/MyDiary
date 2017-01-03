import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})
export class DiaryPage {
  segment: string;

  constructor(public navCtrl: NavController) {
    this.segment = 'entry';
  }
}
