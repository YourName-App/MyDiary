import { Component, Input } from '@angular/core';
import { AlertController, ModalController, ItemSliding } from 'ionic-angular';
import { IDiary, DiaryService } from '../../providers/diary-service';
import { DiaryEditPage } from '../diary-edit/diary-edit';
import { DiaryDetailPage } from '../diary-detail/diary-detail';
import { ConfigService } from '../../providers/config-service';
import { LocaleService } from '../../providers/locale-service';

@Component({
  selector: 'page-diary-list',
  templateUrl: 'diary-list.html'
})
export class DiaryListPage {

  _theme: string;
  _diaryList: any;

  @Input()
  set diaryList(diaryList: any) {
    this._diaryList = diaryList;
  }

  @Input()
  set theme(theme: string) {
    this._theme = theme;
  }

  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController,
    private diaryServ: DiaryService, private configServ: ConfigService,
    private localeServ: LocaleService) {
  }

  ionViewCanEnter(): boolean {
    return this.configServ.unlockScreen();
  }

  showDiaryDetail(diaryId: string): void {
    this.modalCtrl.create(DiaryDetailPage, {diaryId}).present();
  }

  createDiary(): void {
    this.modalCtrl.create(DiaryEditPage).present();
  }

  updateDiary(diaryId: string, diary: IDiary, slidingItem: ItemSliding) {
    this.modalCtrl.create(DiaryEditPage, {diaryId, diary}).present();
    slidingItem.close();
  }

  deleteDiary(diaryId: string, slidingItem: ItemSliding): void {
    let options = {
      title: '',
      message: '',
      buttons: [{
        text: '',
        handler: () => {
          this.diaryServ.deleteDiary(diaryId);
        }
      }, {
        text: '',
        role: 'cancel'
      }]
    };
    let confirm = this.alertCtrl.create(options);

    this.localeServ.localize('DIARY_LIST.DELETE.TITLE',   (value:string) => { options.title = value; });
    this.localeServ.localize('DIARY_LIST.DELETE.MESSAGE', (value:string) => { options.message = value; });
    this.localeServ.localize('DIARY_LIST.DELETE.CONFIRM', (value:string) => { options.buttons[0].text = value; });
    this.localeServ.localize('DIARY_LIST.DELETE.CANCEL',  (value:string) => { options.buttons[1].text = value; });

    confirm.present();
    slidingItem.close();
  }
}
