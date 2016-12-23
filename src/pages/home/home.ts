import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DiarySegment } from "../segment/segment";

@Component({
  selector: "home-page",
  templateUrl: "home.html"
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  pushDiarySegment() {
    this.navCtrl.push(DiarySegment);
  }
}
