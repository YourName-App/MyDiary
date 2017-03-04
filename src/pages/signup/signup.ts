import { Component } from '@angular/core';
import { LoadingController, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';

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
    private toastCtrl: ToastController, private loadingCtrl: LoadingController,
    private viewCtrl: ViewController) {
  
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
          this.toastMessage('註冊失敗，請稍後再試');
        });
      });

      this.loader = this.loadingCtrl.create();
      this.loader.present();
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
