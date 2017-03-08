import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
import { LocaleService } from '../../providers/locale-service';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

  resetPasswordForm: any;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(private navCtrl: NavController, private authServ: AuthService, 
    private formBuilder: FormBuilder, private alertCtrl: AlertController,
    private localeServ:LocaleService) {

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
      this.authServ.resetPassword(this.resetPasswordForm.value.email).then((user) => {
        let options =
        {
          message: '',           // '重設密碼的連結已寄送至你的電子郵件'
          buttons: [{
            text: '',            // '確認',
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }]
        };
        this.localeServ.localize('RESET_PASSWORD_PAGE.RESET.MSG',     (value:string) => {options.message = value;});
        this.localeServ.localize('RESET_PASSWORD_PAGE.RESET.CONFIRM', (value:string) => {options.buttons[0].text= value;});
        let alert = this.alertCtrl.create(options);

        alert.present();
      }, (error) => {
        let options =
        {
          message: '',           // '此電子郵件尚未註冊。'
          buttons: [{
            text: '',            // '確認'
            role: 'cancel'
          }]
        };
        this.localeServ.localize('RESET_PASSWORD_PAGE.ALERT.MSG',     (value:string) => {options.message = value;});
        this.localeServ.localize('RESET_PASSWORD_PAGE.ALERT.CONFIRM', (value:string) => {options.buttons[0].text= value;});
        let errorAlert = this.alertCtrl.create(options);
        errorAlert.present();
      });
    }
  }
}

