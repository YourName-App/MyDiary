import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  theme: string;


  constructor(private navCtrl: NavController, private navParams: NavParams,
    private viewCtrl: ViewController, private configServ: ConfigService) {}

  ionViewWillEnter() {
    this.theme = this.configServ.getUserGender();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
