import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { MemoService } from '../../providers/memo-service';

@Component({
  selector: 'page-memo-detail',
  templateUrl: 'memo-detail.html'
})
export class MemoDetailPage {
  public memo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public memoServ: MemoService) {

    this.memoServ.getMemo(this.navParams.get('memoId')).subscribe( memoSnap => {
      this.memo = memoSnap;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
