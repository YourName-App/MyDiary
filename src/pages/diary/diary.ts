import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

export class Diary {
  id: number;
  name: string;
  title: string;
  date: string;
  content: string;
}

@Component({
  selector: "diary-page",
  templateUrl: "diary.html"
})
export class DiaryPage {
  title = 'Details of My Diary';
  diary: Diary = {
    id: 1,
    name: 'Nobody',
    title: 'One Day In Mt. Fuji',
    date : '2016-12-26',
    content: 'La La Land !'
  };
  constructor(public navCtrl: NavController) {}
}
