import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
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
  loader: any;

  constructor(public navCtrl: NavController, public authServ: AuthService,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public viewCtrl: ViewController) {
  
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
      this.authServ.registerUser(this.signupForm.value.email, this.signupForm.value.password).then( user => {
        this.navCtrl.setRoot(TabsPage);
      }, error => {
        this.loader.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: '註冊失敗，請稍後再試。',
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
}
