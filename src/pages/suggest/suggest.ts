import { Component } from '@angular/core';
import { NavController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SocialSharing } from 'ionic-native';

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html'
})
export class SuggestPage {
  suggestForm: any;
  suggestChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public formBuilder: FormBuilder, public viewCtrl: ViewController) {

    this.suggestForm = formBuilder.group({
      suggest: ['', Validators.required]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  elementChanged(input){
    this.suggestChanged = true;
  }

  sendSuggestion() {
    this.submitAttempt = true;

    if (!this.suggestForm.valid) {
      console.log(this.suggestForm.value);
    } else {
      SocialSharing.canShareViaEmail().then(() => {
        SocialSharing.shareViaEmail(this.suggestForm.value.suggest, 'MyDiary 使用者建議',
          ['yourname.ionic.app@gmail.com']).then(() => {

          const alert = this.alertCtrl.create({
            message: '訊息已送出',
            buttons: [{
              text: '確認',
              role: 'cancel',
              handler: () => {
                this.dismiss();
              }
            }]
          });

          alert.present();
        });
      }).catch(() => {
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
