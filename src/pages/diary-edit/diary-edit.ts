import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatePicker } from 'ionic-native';
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
  now: any;
  diaryMonth: any;
  diaryDay: any;
  diaryDate: any;
  diaryTime: any;

  constructor(private navController: NavController) {
    moment.locale('zh-tw');
    this.now = moment().format('YYYYMMDDHHmm');
    this.diaryMonth = moment(this.now, 'YYYYMMDDHHmm').format('MMMM');
    this.diaryDay = moment(this.now, 'YYYYMMDDHHmm').format('dddd');
    this.diaryDate = moment(this.now, 'YYYYMMDDHHmm').format('D');
    this.diaryTime = moment(this.now, 'YYYYMMDDHHmm').format('HH:mm');
  }

  openDatePicker() {
    DatePicker.show({
      date: this.now,
      mode: 'datetime'
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
