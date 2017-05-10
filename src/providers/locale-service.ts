import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from 'ng2-translate';
import { Globalization } from '@ionic-native/globalization';

class TargetOnLocaleChange {
	mapping: string;
	update: (value: string) => void;
}

@Injectable()
export class LocaleService {
	listToLocaleUpdate: TargetOnLocaleChange[] = [];
  userLocale: string = '';

	constructor(public translate: TranslateService, private storage: Storage,
	  private globalization: Globalization) {

    this.fetchUserLocale().then(userLocale => {
      this.userLocale = userLocale;
      translate.setDefaultLang(this.userLocale);
      this.updatePageLocale();
    });
	}

  fetchUserLocale(): Promise<string> {
		return this.storage.get('userLocale')
			.then(val => {
				if (val === null || val.trim().length === 0) {
					return this.globalization.getPreferredLanguage()
						.then(lang => {
							let language: string = '';

							if (lang.value === 'ko') {
								this.storage.set('userLocale', 'ko');
								language = 'ko';
							} else if (lang.value.startsWith('zh')) {
								this.storage.set('userLocale', 'zh-tw');
								language = 'zh-tw';
							} else {
								this.storage.set('userLocale', 'en');
								language = 'en';
							}

							return language;
						})
						.catch(error => {
							console.log(error);
							return 'en';
						})
				} else {
					return val;
				}
			})
			.catch(error => {
				console.log(error);
				return 'en';
			})
  }

  getUserLocale(): string {
    return this.userLocale;
  }

  setUserLocale(locale: string) {
    this.userLocale = locale;
		this.translate.use(locale);
  }
  
	subscribeTargetOnLocaleChange(target: TargetOnLocaleChange) {
		this.listToLocaleUpdate.push(target);
		this.localize(target.mapping, target.update);
	}

	subscribe(mapping:string, update:(value: string) => void) {
		var target = new TargetOnLocaleChange();
		target.mapping = mapping;
		target.update = update;
		this.listToLocaleUpdate.push(target);
		this.localize(mapping, update);
	}

	updatePageLocale() {
		for (let target of this.listToLocaleUpdate) {
			this.translate.get(target.mapping).subscribe((value: string) => {
				target.update(value);
			});
		}
	}

	localize(mapping:string, update:(value: string) => void) {
		this.translate.get(mapping).subscribe((value: string) => {
			update(value);
		});
	}
}
