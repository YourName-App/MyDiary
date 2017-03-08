import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
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
    private formBuilder: FormBuilder, private toastCtrl: ToastController,
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
      let alert;
      this.authServ.resetPassword(this.resetPasswordForm.value.email).then((user) => {
        this.localeServ.localize('RESET_PASSWORD_PAGE.RESET.MSG',     (value:string) => {alert = value;});
        this.toastMessage(alert);                // 重設密碼的連結已寄送至你的電子郵件
      }, (error) => {
        this.localeServ.localize('RESET_PASSWORD_PAGE.ALERT.MSG', (value:string) => {alert= value;});
        this.toastMessage(alert);                // 此電子郵件尚未註冊。
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
