import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigService } from '../../providers/config-service';
import * as moment from 'moment';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  _theme: string;
  timestamp: string;
  month: string;
  day: string;
  date: string;


  @Input()
  set theme(theme: string) {
    this._theme = theme;
  }

  constructor(private navCtrl: NavController, private configServ: ConfigService) {
    moment.locale('zh-tw');
    this.timestamp = moment().format();
    this.month = moment(this.timestamp).format('MMMM');
    this.day = moment(this.timestamp).format('dddd');
    this.date = moment(this.timestamp).format('D');
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }
}
