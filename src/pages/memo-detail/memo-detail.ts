import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { MemoService } from '../../providers/memo-service';

@Component({
  selector: 'page-memo-detail',
  templateUrl: 'memo-detail.html'
})
export class MemoDetailPage {
  memo: any;
  memoId: string = '';
  items: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public alertCtrl: AlertController,
    public memoServ: MemoService) {

    this.memoServ.getMemo(this.navParams.get('memoId')).subscribe((memoSnap) => {
      this.memo = memoSnap;
    });

    this.memoId = this.navParams.get('memoId');
    this.items = this.memo.items || [];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createMemoItem() {
    let alert = this.alertCtrl.create({
      title: '新增備忘錄項目',
      inputs: [{
        name: 'entry',
        placeholder: '備忘錄項目'
      }],
      buttons: [
        {
          text: '確認',
          handler: data => {
            if (data.entry.trim().length === 0) {
              let alert = this.alertCtrl.create({
                title: '新增失敗',
                subTitle: '請輸入備忘錄項目',
                buttons: ['確認']
              });
              alert.present();
            } else {
              this.items.push({entry: data.entry, checked: false});
              this.memoServ.createMemoItem(this.memoId, this.items);
            }
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });

    alert.present();
  }

  toggleItem(item) {
    console.log(item);
  }
}
