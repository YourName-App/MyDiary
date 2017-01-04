import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  resetPasswordForm: any;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController) {

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }

  elementChanged(input){
    this.emailChanged = true;
  }

  resetPassword() {
    this.submitAttempt = true;

    if (!this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    } else {
      this.authData.resetPassword(this.resetPasswordForm.value.email).then((user) => {
        const alert = this.alertCtrl.create({
          message: '重設密碼的連結已寄送至你的電子郵件',
          buttons: [{
            text: '確認',
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }]
        });

        alert.present();
      }, (error) => {
        var errorMessage: string = error.message;
        const errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [{
            text: '確認',
            role: 'cancel'
          }]
        });

        errorAlert.present();
      });
    }
  }
}

