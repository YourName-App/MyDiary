import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';

export class LocaleUpdatedTarget {
	mapping:string;
	component:any;
	update:(component:any, value:string)=> void;
}

@Injectable()
export class LocaleService {
	// update the locale of the rest of component subscribed 
	listToLocaleUpdate: LocaleUpdatedTarget [] = [];

	constructor(public translate: TranslateService) {
		translate.setDefaultLang('ch');
		this.updatePageLocale();
	}

	updatePageLocale() {
		this.updateAll();
	}
	
	subscribeLocaleUpdateTarget(target:LocaleUpdatedTarget) {
		this.listToLocaleUpdate.push(target);
	}

	subscribe(component:any, mapping:string, localize:(component, value:string) => void) {
		var target = new LocaleUpdatedTarget(); 
		target.component = component;
		target.mapping = mapping;
		target.update = localize;
		this.listToLocaleUpdate.push(target);
	}

	use(locale:string){
		this.translate.use(locale);
	}

	private updateAll() {
		for (let target of this.listToLocaleUpdate) {
			this.translate.get(target.mapping).subscribe((value: string) => {
				target.update(target.component, value);
			});
		}
	}

	updateNow(mapping:string, target:any, localize:(target:any, value:string)=>void) {
		this.translate.get(mapping).subscribe((value: string) => {
			localize(target, value);
		});
	}

	update(mapping:string, target:string) {
		this.translate.get(mapping).subscribe((value: string) => {
			this.updateNow(mapping, target, (target:string, value:string) => {
				target = value;
			});
		});
	}
}
