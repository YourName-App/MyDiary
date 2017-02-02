import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
