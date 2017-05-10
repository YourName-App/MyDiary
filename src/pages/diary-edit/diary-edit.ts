import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavParams, ViewController, FabContainer } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { IDiary, DiaryService } from '../../providers/diary-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';
import * as moment from 'moment';
import 'moment/locale/zh-tw';
import 'moment/locale/ko';

@Component({
  selector: 'page-diary-edit',
  templateUrl: 'diary-edit.html'
})
export class DiaryEditPage {

  theme: string;
  diaryForm: any;
  diaryId: string = '';
  inputDiary: IDiary;
  inputTimeStamp: string = '';
  inputTitle: string = '';
  inputContent: string = '';

  timestamp: string;
  diaryYear: string;
  diaryMonth: string;
  diaryDay: string;
  diaryDate: string;
  diaryTime: string;
  mood: string;
  weather: string;

  mode: string = '';
  modeDesc: string = '';
  contentChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(private navParams: NavParams, private viewCtrl: ViewController,
    private diaryServ: DiaryService, private formBuilder: FormBuilder,
    private element: ElementRef, private configServ: ConfigService,
    private localeServ:LocaleService, private datePicker: DatePicker) {

    this.diaryId = this.navParams.get('diaryId') || '';
    this.inputDiary = this.navParams.get('diary') || {};
    this.inputTimeStamp = this.inputDiary.timestamp || '';
    this.inputTitle = this.inputDiary.title || '';
    this.inputContent = this.inputDiary.content || '';
    this.mood = this.inputDiary.mood || 'happy';
    this.weather = this.inputDiary.weather || 'sunny';

    this.diaryForm = formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    
    let lang = this.localeServ.getUserLocale();
    moment.locale(lang);

    if (this.diaryId) {
      this.mode = 'update';
      this.modeDesc = '';      // 編輯日記
      this.diaryForm.controls['title'].patchValue(this.inputTitle);
      this.diaryForm.controls['content'].patchValue(this.inputContent);
      this.timestamp = this.inputTimeStamp;
      this.localeServ.localize('DIARY_EDIT_PAGE.MODE_DESC.UPDATE', (value:string)=>{ this.modeDesc = value; });
    } else {
      this.mode = 'create';
      this.modeDesc = '';      // 新增日記
      this.timestamp = moment().format();
      this.localeServ.localize('DIARY_EDIT_PAGE.MODE_DESC.CREATE', (value:string)=>{ this.modeDesc = value; });
    }

    this.diaryYear = moment(this.timestamp).format('YYYY');
    this.diaryMonth = moment(this.timestamp).format('MMMM');
    this.diaryDay = moment(this.timestamp).format('ddd');
    this.diaryDate = moment(this.timestamp).format('D');
    this.diaryTime = moment(this.timestamp).format('HH:mm');
  }

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }
  
  ionViewWillEnter() {
    this.adjustTextarea();
    this.theme = this.configServ.getUserGender();
  }

	adjustTextarea(): void {
		let area = this.element.nativeElement.querySelector("textarea");

    if (area !== null && area !== undefined) {
      area.style.height = area.scrollHeight + "px";
    }
	}

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  elementChanged(input): void {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  openDatePicker(): void {
    let options = {
      date: moment(this.timestamp).toDate(),
      mode: 'datetime',
      locale: this.localeServ.getUserLocale(),
      doneButtonLabel: '',                          // 確認
      cancelButtonLabel: '',                        // 取消
      is24Hour: true
    };

    this.localeServ.localize('DIARY_EDIT_PAGE.OPEN_DATE_PICKER.DONE',   (value:string)=>{ options.doneButtonLabel   = value; });
    this.localeServ.localize('DIARY_EDIT_PAGE.OPEN_DATE_PICKER.CANCEL', (value:string)=>{ options.cancelButtonLabel = value; });

    this.datePicker.show(options).then(
      pickDate => {
        if (pickDate !== null && pickDate !== undefined) {
          this.timestamp = moment(pickDate).format();
          this.diaryYear = moment(pickDate).format('YYYY');
          this.diaryMonth = moment(pickDate).format('MMMM');
          this.diaryDay = moment(pickDate).format('dddd');
          this.diaryDate = moment(pickDate).format('D');
          this.diaryTime = moment(pickDate).format('HH:mm');
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  editDiary(): void {
    this.submitAttempt = true;
    
    if (!this.diaryForm.valid) {
      console.log(this.diaryForm.value);
    } else {
      let sortstamp = Number(moment(this.timestamp).format('YYYYMMDDHHmm')) * (-1);

      let diary: IDiary = {
        ".priority": sortstamp,
        timestamp: this.timestamp,
        year: this.diaryYear,
        month: this.diaryMonth,
        day: this.diaryDay,
        date: this.diaryDate,
        time: this.diaryTime,
        title: this.diaryForm.value.title,
        content: this.diaryForm.value.content.trim(),
        mood: this.mood,
        weather: this.weather
      }

      if (this.mode === 'create') {
        this.diaryServ.createDiary(diary)
        .then(
          () => {this.dismiss();}, 
          error => {console.log(error);}
        );
      } else if (this.mode === 'update') {
        this.diaryServ.updateDiary(this.diaryId, diary)
        .then(
          () => {this.dismiss();}, 
          error => {console.log(error);}
        );
      }
    } 
  }

  selectMood(mood: string, fab: FabContainer): void {
    this.mood = mood;
    fab.close();
  }

  selectWeather(weather: string, fab: FabContainer): void {
    this.weather = weather;
    fab.close();
  }
}
