import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SocialSharing } from 'ionic-native';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html'
})
export class SuggestPage {

  theme: string;
  suggestForm: any;
  suggestChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController,
    private formBuilder: FormBuilder, private configServ: ConfigService) {

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
          SocialSharing.shareViaEmail(this.suggestForm.value.suggest, 'MyDiary 使用者建議', ['yourname.ionic.app@gmail.com']);
        })
        .catch(() => {
          const alert = this.alertCtrl.create({
            message: '你的手機不支援此功能',
            buttons: [{
              text: '確認',
              role: 'cancel'
            }]
          });

          alert.present();
        });
    }
  }
}
