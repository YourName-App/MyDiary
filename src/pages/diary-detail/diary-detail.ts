import { Component, ElementRef } from '@angular/core';
import { NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { DiaryEditPage } from '../diary-edit/diary-edit';
import { IDiary, DiaryService } from '../../providers/diary-service';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';

@Component({
  selector: 'page-diary-detail',
  templateUrl: 'diary-detail.html'
})
export class DiaryDetailPage {

  theme: string;
  diary: any;
  diaryId: string;

  constructor(private navParams: NavParams, private viewCtrl: ViewController,
    private alertCtrl: AlertController, private modalCtrl: ModalController,
    private diaryServ: DiaryService, private configServ: ConfigService,
    private element: ElementRef,
    private localeServ: LocaleService) {

    this.diaryServ.getDiary(this.navParams.get('diaryId')).subscribe((diarySnap) => {
      this.diary = diarySnap;
    });

    this.diaryId = this.navParams.get('diaryId');
  }

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }

  ionViewWillEnter() {
    this.adjustTextarea();
    this.theme = this.configServ.getUserGender();
  }

	adjustTextarea(): void {
		let area = this.element.nativeElement.querySelector("textarea");

    if (area !== null && area !== undefined) {
      area.style.height = area.scrollHeight + "px";
    }
	}

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  updateDiary(diaryId: string, diary: IDiary): void {
    this.modalCtrl.create(DiaryEditPage, {diaryId, diary}).present();
  }

  deleteDiary(diaryId: string): void {
    let options = {
      title: '',
      message: '',
      buttons: [{
        text: '',
        handler: () => {
          this.diaryServ.deleteDiary(diaryId);
          this.dismiss();
        }
      }, {
        text: '',
        role: 'cancel'
      }]
    };

    this.localeServ.localize('DIARY_DETAIL.DELETE.TITLE',   (value:string) => { options.title = value; });
    this.localeServ.localize('DIARY_DETAIL.DELETE.MESSAGE', (value:string) => { options.message = value; });
    this.localeServ.localize('DIARY_DETAIL.DELETE.CONFIRM', (value:string) => { options.buttons[0].text = value; });
    this.localeServ.localize('DIARY_DETAIL.DELETE.CANCEL',  (value:string) => { options.buttons[1].text = value; });

    let confirm = this.alertCtrl.create(options);
    confirm.present();
  }
}
