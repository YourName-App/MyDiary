import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  timestamp: string;
  month: string;
  day: string;
  date: string;


  constructor(public navCtrl: NavController) {
    moment.locale('zh-tw');
    this.timestamp = moment().format();
    this.month = moment(this.timestamp).format('MMMM');
    this.day = moment(this.timestamp).format('dddd');
    this.date = moment(this.timestamp).format('D');
  }
}
