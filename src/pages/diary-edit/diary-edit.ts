import { Component } from '@angular/core';
import { NavController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePicker } from 'ionic-native';
import { Autoresize } from '../../components/autoresize/autoresize';
import * as moment from 'moment';

@Component({
  selector: 'page-diary-edit',
  templateUrl: 'diary-edit.html'
})
export class DiaryEditPage {
  diaryForm: any;
  now: any;
  diaryMonth: string;
  diaryDay: string;
  diaryDate: string;
  diaryTime: string;
  contentChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public viewCtrl: ViewController, public formBuilder: FormBuilder) {

    moment.locale('zh-tw');
    this.now = moment();
    this.diaryMonth = moment(this.now).format('MMMM');
    this.diaryDay = moment(this.now).format('dddd');
    this.diaryDate = moment(this.now).format('D');
    this.diaryTime = moment(this.now).format('HH:mm');

    this.diaryForm = formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  openDatePicker() {
    DatePicker.show({
      date: this.now,
      mode: 'datetime',
      locale: 'zh-tw',
      doneButtonLabel: '確認',
      cancelButtonLabel: '取消',
      is24Hour: true
    }).then(
      pickDate => {
        if (pickDate !== null && pickDate !== undefined) {
          this.now = pickDate;
          this.diaryMonth = moment(pickDate).format('MMMM');
          this.diaryDay = moment(pickDate).format('dddd');
          this.diaryDate = moment(pickDate).format('D');
          this.diaryTime = moment(pickDate).format('HH:mm');
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
