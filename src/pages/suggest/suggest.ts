import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SocialSharing } from 'ionic-native';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html'
})
export class SuggestPage {

  theme: string;
  suggestForm: any;
  suggestChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(private toastCtrl: ToastController, private formBuilder: FormBuilder,
    private configServ: ConfigService,
    private localeServ: LocaleService) {

    this.suggestForm = formBuilder.group({
      suggest: ['', Validators.required]
    });
  }

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }

  elementChanged(input){
    this.suggestChanged = true;
  }

  sendSuggestion() {
    this.submitAttempt = true;

    if (!this.suggestForm.valid) {
      console.log(this.suggestForm.value);
    } else {
      SocialSharing.canShareViaEmail()
        .then(() => {
          let subject:string;
          this.localeServ.localize('SUGGEST_PAGE.SEND.SUBJECT', (value:string) => {subject = value;});
          SocialSharing.shareViaEmail(this.suggestForm.value.suggest, subject, ['yourname.ionic.app@gmail.com']);
        })
        .catch(() => {
          let alert = '';          // 你的手機不支援此功能
          this.localeServ.localize('SUGGEST_PAGE.ALERT.MSG',     (value:string ) => {alert = value;});
          this.toastMessage(alert);
        });
    }
  }

  private toastMessage(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      dismissOnPageChange: true
    });

    toast.present();
  }
}
