import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';

import { LandingPage } from '../pages/landing/landing';
import { SuggestPage } from '../pages/suggest/suggest';
import { AboutPage } from '../pages/about/about';
import { ConfigPage } from '../pages/config/config';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  createModal?: boolean;
  logsOut?: boolean;
}

@Injectable()
export class LocaleService {

	// List of pages that can be navigated to from the side menu
	settingPages: PageInterface[] = [
		{ title: '設定', component: ConfigPage, createModal: true, icon: 'ios-build-outline' }
	];

	otherPages: PageInterface[] = [
		{ title: '建議', component: SuggestPage, createModal: true, icon: 'ios-chatbubbles-outline' },
		{ title: '關於', component: AboutPage, createModal: true, icon: 'ios-help-circle-outline' }
	];

	accountPages: PageInterface[] = [
		{ title: '登出', component: LandingPage, icon: 'log-out', logsOut: true }
	];

	constructor(public translate: TranslateService) {
 		translate.setDefaultLang('en');
 		this.updatePageLocale();
	}

	updatePageLocale(){
		 // change page title
      this.translate.get('PAGE.SETTING.SETTINGS').subscribe((value: string) => {
        this.settingPages[0].title = value;
      });

      this.translate.get('PAGE.OTHER.SUGGESTION').subscribe((value: string) => {
        this.otherPages[0].title = value;
      });

      this.translate.get('PAGE.OTHER.ABOUT').subscribe((value: string) => {
        this.otherPages[1].title = value;
      });

      this.translate.get('PAGE.ACCOUNT.LOGOUT').subscribe((value: string) => {
        this.accountPages[0].title = value;
      });

	}
}
