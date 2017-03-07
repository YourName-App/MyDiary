import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

  resetPasswordForm: any;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(private navCtrl: NavController, private authServ: AuthService, 
    private formBuilder: FormBuilder, private toastCtrl: ToastController) {

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
        this.toastMessage('已寄送重設密碼的電子郵件');
      }, (error) => {
        this.toastMessage('此電子郵件尚未註冊');
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

