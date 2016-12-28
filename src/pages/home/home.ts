import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { SegmentPage } from "../segment/segment";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  pushDiarySegment() {
    this.navCtrl.push(SegmentPage);
  }
}
