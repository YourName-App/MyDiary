import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePicker } from 'ionic-native';
import { DiaryPage } from '../diary/diary';
import { Autoresize } from '../../components/autoresize/autoresize';
import * as moment from 'moment';

@Component({
  selector: 'page-diary-edit',
  templateUrl: 'diary-edit.html'
})
export class DiaryEditPage {
  diaryForm: any;
  diaryId: string = '';
  inputTitle: string = '';
  inputContent: string = '';
  mode: string = '';
  modeDesc: string = '';
  contentChanged: boolean = false;
  submitAttempt: boolean = false;

  now: any;
  diaryMonth: string;
  diaryDay: string;
  diaryDate: string;
  diaryTime: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public viewCtrl: ViewController,
    public formBuilder: FormBuilder) {

    this.diaryId = this.navParams.get('diaryId') || '';
    this.inputTitle = this.navParams.get('title') || '';
    this.inputContent = this.navParams.get('content') || '';

    this.diaryForm = formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.compose([Validators.minLength(0), Validators.required])]
    });

    if (this.diaryId) {
      this.mode = 'update';
      this.modeDesc = '編輯日記';
      this.diaryForm.controls['title'].patchValue(this.inputTitle);
      this.diaryForm.controls['conten'].patchValue(this.inputContent);
    } else {
      this.mode = 'create';
      this.modeDesc = '新增日記';
    }

    moment.locale('zh-tw');
    this.now = moment();
    this.diaryMonth = moment(this.now).format('MMMM');
    this.diaryDay = moment(this.now).format('dddd');
    this.diaryDate = moment(this.now).format('D');
    this.diaryTime = moment(this.now).format('HH:mm');
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

  test() {
    //this.appCtrl.getActiveNav().last();
    //this.appCtrl.getRootNav().;
    //this.navCtrl.pop();
    //this.navCtrl.push(DiaryPage);
    //this.events.publish('reloadDiaryPage');
    //this.navCtrl.pop();
    this.viewCtrl._didLoad();
    //console.log(this.viewCtrl.getNav());
  }

  editContact() {
    this.submitAttempt = true;
    /*
    if (!this.diaryForm.valid) {
      console.log(this.diaryForm.value);
    } else {
      if (this.mode === 'create') {
        this.diaryServ.createContact(
          this.diaryForm.value.name, 
          this.diaryForm.value.phone,
          this.diaryForm.value.avatar || 'assets/img/avatar-female.png'
        ).then(
          () => {this.dismiss();}, 
          error => {console.log(error);}
        );
      } else if (this.mode === 'update') {
        this.diaryServ.updateContact(
          this.diarytId,
          this.diaryForm.value.name, 
          this.diaryForm.value.phone,
          this.diaryForm.value.avatar || 'assets/img/avatar-female.png'
        ).then(
          () => {this.dismiss();}, 
          error => {console.log(error);}
        );
      }
  } */
  }
}
