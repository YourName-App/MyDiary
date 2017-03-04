import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';
import { MemoService } from '../../providers/memo-service';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-memo-edit',
  templateUrl: 'memo-edit.html'
})
export class MemoEditPage {

  theme: string;
  memoForm: any;
  memoId: string = '';
  inputTitle: string = '';
  mode: string = '';
  modeDesc: string = '';
  titleChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(private navParams: NavParams, private viewCtrl: ViewController,
    private memoServ: MemoService, private formBuilder: FormBuilder,
    private configServ: ConfigService) {

    this.memoId = this.navParams.get('memoId') || '';
    this.inputTitle = this.navParams.get('title') || '';

    this.memoForm = formBuilder.group({
       title: ['', Validators.required]
    });

    if (this.navParams.get('memoId')) {
      this.mode = 'update';
      this.modeDesc = '編輯備忘錄';
      this.memoForm.controls['title'].patchValue(this.inputTitle);
    } else {
      this.mode = 'create';
      this.modeDesc = '新增備忘錄';
    }
  }

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }
  
  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  elementChanged(input) {
     let field = input.inputControl.name;
     this[field + "Changed"] = true;
  }

  editMemo() {
    this.submitAttempt = true;

    if (!this.memoForm.valid) {
      console.log(this.memoForm.value);
    } else {
      if (this.mode === 'create') {
        this.memoServ.createMemo(this.memoForm.value.title).then(
          () => {this.dismiss();}, 
          (error) => {console.log(error);}
        );
      } else if (this.mode === 'update') {
        this.memoServ.updateMemo(this.memoId, this.memoForm.value.title).then(
          () => {this.dismiss();}, 
          (error) => {console.log(error);}
        );
      }
    } 
  }
}
