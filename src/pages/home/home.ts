import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DiaryPage } from '../diary/diary';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  public selectTab(tabIndex: number): void {
    this.navCtrl.parent.select(tabIndex);
  }
}
