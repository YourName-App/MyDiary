import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-segment",
  templateUrl: "segment.html"
})
export class SegmentPage {
  segment: string;

  constructor(public navCtrl: NavController) {
    this.segment = "entry";
  }
}
