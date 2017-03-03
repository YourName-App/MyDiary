import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';

export class TargetOnLocaleChange {
	mapping  :string;
	update   :(value:string)=> void;
}

@Injectable()
export class LocaleService {
	// update the locale of the rest of component subscribed
	listToLocaleUpdate: TargetOnLocaleChange [] = [];

	constructor(public translate: TranslateService) {
		translate.setDefaultLang('ch');
		this.updatePageLocale();
	}

	subscribeLocaleUpdateTarget(target:TargetOnLocaleChange) {
		this.listToLocaleUpdate.push(target);
		this.localize(target.mapping, target.update);
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

	use(locale:string){
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
}
