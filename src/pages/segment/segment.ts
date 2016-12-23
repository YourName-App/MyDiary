import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "diary-segment",
  templateUrl: "segment.html"
})
export class DiarySegment {
  segment: string;

  constructor(public navCtrl: NavController) {
    this.segment = "entry";
  }
}
