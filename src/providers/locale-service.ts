import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';

export class TargetOnLocaleChange {
	mapping  :string;
	update   :(value:string)=> void;
}

@Injectable()
export class LocaleService {
//  update the locale of the rest of component subscribed
	listToLocaleUpdate: TargetOnLocaleChange [] = [];
//	currentLang:string = this.translate.currentLang;
	onCalendarLocaleChange:() => void = ()=>{ };

	constructor(public translate: TranslateService) {
		translate.setDefaultLang('en');
		this.updatePageLocale();
		this.onCalendarLocaleChange();
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
