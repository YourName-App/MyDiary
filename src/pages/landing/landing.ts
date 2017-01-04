import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  constructor(public navCtrl: NavController, public authData: AuthData, public loadingCtrl: LoadingController) {}

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

  goToAnonymousLogin() {
    this.authData.anonymousLogin().then( user => {
      this.navCtrl.setRoot(TabsPage);
    });

    const loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });

    loading.present();
  }
}
