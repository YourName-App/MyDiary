import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  yourName: string;

  constructor(public navCtrl: NavController, public menu: MenuController,
    public storage: Storage) {

    this.menu.swipeEnable(true);
  }

  ionViewWillEnter() {
    this.storage.get('yourName').then((val) => {
      this.yourName = val;
    }, (error) => {
      console.log(error);
    })
  }

  selectTab(tabIndex: number) {
    this.navCtrl.parent.select(tabIndex);
  }
}
