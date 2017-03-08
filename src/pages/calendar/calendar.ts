import { Component, Input } from '@angular/core';
import { ConfigService } from '../../providers/config-service';
import * as moment from 'moment';
import 'moment/locale/zh-tw';
import { LocaleService } from '../../providers/locale-service';

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

  constructor(private configServ: ConfigService, private localeServ: LocaleService) {
  //moment.locale('zh-tw');
    this.init('en');

    localeServ.subscribeCalendar(this.onLocaleChange);
    this.init(this.localeServ.getCalendarLang());
  }

  init(lang:string) {
    moment.locale(lang);
    this.timestamp = moment().format();
    this.month = moment(this.timestamp).format('MMMM');
    this.day = moment(this.timestamp).format('dddd');
    this.date = moment(this.timestamp).format('D');
  }

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }

  onLocaleChange(lang:string) {
    this.init(this.localeServ.getCalendarLang());
  }
}
