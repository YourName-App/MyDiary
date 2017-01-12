import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { MemoService } from '../../providers/memo-service';

@Component({
  selector: 'page-memo-edit',
  templateUrl: 'memo-edit.html'
})
export class MemoEditPage {
  memoForm: any;
  memoTitle: string = '';
  titleChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public memoServ: MemoService, public formBuilder: FormBuilder) {

    if (this.navParams.get('memoId')) {
      this.memoTitle = '編輯備忘錄';
    } else {
      this.memoTitle = '新增備忘錄';
    }

    this.memoForm = formBuilder.group({
       title: ['', Validators.required]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  elementChanged(input) {
     let field = input.inputControl.name;
     this[field + "Changed"] = true;
  }

  createMemoTitle() {
    this.submitAttempt = true;

    if (!this.memoForm.valid) {
      console.log(this.memoForm.value);
    } else {
      this.memoServ.createMemoTitle(this.memoForm.value.title).then(() => {
        this.dismiss();
      }, (error) => {
        console.log(error);
      });
    } 
  }
}
