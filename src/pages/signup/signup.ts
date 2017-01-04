import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { TabsPage } from '../tabs/tabs';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading;

  constructor(public navCtrl: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }    

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  signupUser() {
    this.submitAttempt = true;

    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.linkAccount(this.signupForm.value.email, this.signupForm.value.password).then( authData => {
        this.navCtrl.setRoot(TabsPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: '註冊帳號失敗，請稍後再試',
            buttons: [{
              text: '確認',
              role: 'cancel'
            }]
          });
          
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });

      this.loading.present();
    }
  } 
}
