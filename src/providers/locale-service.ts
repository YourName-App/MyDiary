import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from 'ng2-translate';

export class TargetOnLocaleChange {
	mapping  :string;
	update   :(value:string)=> void;
}

@Injectable()
export class LocaleService {
  //  update the locale of the rest of component subscribed
	listToLocaleUpdate: TargetOnLocaleChange [] = [];
  userLocale: string = '';

	onCalendarLocaleChange:() => void = ()=>{ };

	constructor(public translate: TranslateService, private storage: Storage) {
    this.fetchUserLocale().then(userLocale => {
      this.userLocale = userLocale;
      translate.setDefaultLang(this.userLocale);
      this.updatePageLocale();
      this.onCalendarLocaleChange();
    });
	}

  fetchUserLocale(): Promise<string> {
    return this.storage.get('userLocale')
      .then(val => {
        this.userLocale = (val != null && val.trim().length != 0) ? val : 'en';
        return this.userLocale;
      })
      .catch(error => {
        console.log(error);
      })
  }

  getUserLocale(): string {
    return this.userLocale;
  }

  setUserLocale(locale: string) {
    this.userLocale = locale;
  }
  
	subscribeTargetOnLocaleChange(target:TargetOnLocaleChange) {
		this.listToLocaleUpdate.push(target);
		this.localize(target.mapping, target.update);
	}

	subscribe(mapping:string, update:(value:string) => void) {
		var target = new TargetOnLocaleChange();
		target.mapping = mapping;
		target.update = update;
		this.listToLocaleUpdate.push(target);
		this.localize(mapping, update);
	}

	use(locale:string) {
		this.translate.use(locale);
	}

	updatePageLocale() {
		for (let target of this.listToLocaleUpdate) {
			this.translate.get(target.mapping).subscribe((value: string) => {
				target.update(value);
			});
		}
	}

	localize(mapping:string, update:(value:string)=>void) {
		this.translate.get(mapping).subscribe((value: string) => {
			update(value);
		});
	}

	subscribeCalendar(onLocaleChange:(locale:string) => void) {
		this.onCalendarLocaleChange = () => {
			onLocaleChange(this.translate.currentLang);
		}
	}

	localizeCalendar(onLocaleChange:(locale:string) => void) {
		onLocaleChange(this.translate.currentLang);
	}

	getCalendarLang(){
		if(this.getCurrentLang() == 'en') {
			return 'en';
	    } else if (this.getCurrentLang() == 'ch') {
	    	return 'zh-tw';
	    }
	}

	getCurrentLang() {
		return this.translate.currentLang;
	}
}
