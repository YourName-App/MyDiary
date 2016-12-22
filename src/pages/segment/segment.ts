import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "main-segment",
  templateUrl: "segment.html"
})
export class MainSegment {
  segment: string;

  constructor(public navCtrl: NavController) {
    this.segment = "entry";
  }
}
