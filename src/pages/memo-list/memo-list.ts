import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-memo-list',
  templateUrl: 'memo-list.html'
})
export class MemoListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
