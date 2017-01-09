import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

    this.menu.swipeEnable(true);
  }

  selectTab(tabIndex: number) {
    this.navCtrl.parent.select(tabIndex);
  }
}
