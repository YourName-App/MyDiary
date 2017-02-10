import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
	selector: "ion-textarea[autoresize]"
})
export class Autoresize {
  
	@HostListener("input", ["$event.target"])
	onInput(textArea: HTMLTextAreaElement): void {
		this.adjust();
	}

	constructor(private element: ElementRef) {}

	ngOnInit(): void {
		this.adjust();
	}

	adjust(): void {
		let area = this.element.nativeElement.querySelector("textarea");

    if (area !== null && area !== undefined) {
      area.style.overflow = "hidden";
      area.style.height = "auto";
      area.style.height = area.scrollHeight + "px";
    }
	}
}