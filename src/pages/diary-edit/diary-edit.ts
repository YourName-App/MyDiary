import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

export interface Diary {
  id: number;
  name: string;
  title: string;
  date: string;
  content: string;
}

@Component({
  selector: 'page-diary-edit',
  templateUrl: 'diary-edit.html'
})
export class DiaryEditPage {

  constructor(private navController: NavController) {}
}
