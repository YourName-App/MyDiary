import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
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

  constructor(private alertCtrl: AlertController, private formBuilder: FormBuilder,
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
          let subject = '';
          this.localeServ.localize('SUGGEST_PAGE.SEND.SUBJECT', (value:string) => {subject = value;});
          SocialSharing.shareViaEmail(this.suggestForm.value.suggest, subject, ['yourname.ionic.app@gmail.com']);
        })
        .catch(() => {
          let options = {
            message: '',
            buttons: [{
              text: '',
              role: 'cancel'
            }]
          };

          this.localeServ.localize('SUGGEST_PAGE.ALERT.MSG',     (value:string ) => {options.message = value;});
          this.localeServ.localize('SUGGEST_PAGE.ALERT.CONFIRM', (value:string) => {options.buttons[0].text = value;});

          const alert = this.alertCtrl.create(options);
          alert.present();
        });
    }
  }
}
