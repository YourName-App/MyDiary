import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loader: any;

  constructor(public navCtrl: NavController, public authServ: AuthService,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
      
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  loginUser() {
    this.submitAttempt = true;

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authServ.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.navCtrl.setRoot(TabsPage);
      }, error => {
        this.loader.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: '登入失敗，請確認你的電子郵件與密碼。',
            buttons: [{
              text: '確認',
              role: 'cancel'
            }]
          });
          
          alert.present();
        });
      });

      this.loader = this.loadingCtrl.create({
        dismissOnPageChange: true
      });

      this.loader.present();
    }
  }

  goToResetPassword() {
    this.modalCtrl.create(ResetPasswordPage).present();
  }
}
