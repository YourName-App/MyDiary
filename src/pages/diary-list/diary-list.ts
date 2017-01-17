import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-diary-list',
  templateUrl: 'diary-list.html'
})
export class DiaryListPage {

  constructor(public navCtrl: NavController) {}

  print() {
    console.log('SlidingItem');
  }
}
