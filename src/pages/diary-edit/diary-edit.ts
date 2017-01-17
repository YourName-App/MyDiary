import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';

export interface Diary {
  id: number;
  name: string;
  title: string;
  date: string;
  content: string;
}

@Component({
  selector: 'page-diary-edit',
  templateUrl: 'diary-edit.html'
})
export class DiaryEditPage {
  diaryMonth: any;
  diaryWeek: any;
  diaryDay: any;
  diaryTime: any;

  constructor(private navController: NavController) {
    moment.locale('zh-tw');
    this.diaryMonth = moment().format('MMMM');
    this.diaryWeek = moment().format('dddd');
    this.diaryDay = moment().format('D');
    this.diaryTime = moment().format('HH:mm');
  }
}
