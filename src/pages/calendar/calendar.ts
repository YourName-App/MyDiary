import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
import * as moment from 'moment';
import 'moment/locale/zh-tw';
import 'moment/locale/ko';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage implements OnInit {

  _theme: string;
  timestamp: string;
  month: string;
  day: string;
  date: string;

  @Input()
  set theme(theme: string) {
    this._theme = theme;
  }

  constructor(private configServ: ConfigService, private localeServ: LocaleService) {
  }

  ngOnInit() {
    this.init(this.localeServ.getUserLocale());
  }

  init(lang:string) {
    moment.locale(lang);
    this.timestamp = moment().format();
    this.month = moment(this.timestamp).format('MMMM');
    this.date = moment(this.timestamp).format('D');
    this.day = moment(this.timestamp).format('dddd');
  }

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }
}
