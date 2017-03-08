import { Component } from '@angular/core';
import { LoadingController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
import { LocaleService } from '../../providers/locale-service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm: any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loader: any;

  constructor(private authServ: AuthService, private formBuilder: FormBuilder,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private localeServ:LocaleService) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
      this.authServ.registerUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
        this.loader.dismiss();
      }, (error) => {
        this.loader.dismiss().then( () => {
          let options =
          {
            message: '',         // '註冊失敗，請稍後再試。'
            buttons: [{
              text:  '',         // '確認'
              role: 'cancel'
            }]
          };
          this.localeServ.localize('SIGNUP_PAGE.ALERT.MSG',     (value:string) => { options.message = value; });
          this.localeServ.localize('SIGNUP_PAGE.ALERT.CONFIRM', (value:string) => { options.buttons[0].text= value; });
          let alert = this.alertCtrl.create(options);
          alert.present();
        });
      });

      this.loader = this.loadingCtrl.create();
      this.loader.present();
    }
  } 
}
