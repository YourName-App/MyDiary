import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DiaryPage } from '../diary/diary';
import { ContactPage } from '../contact/contact';
import { MemoPage } from '../memo/memo';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = HomePage;
  tab2Root: any = DiaryPage;
  tab3Root: any = ContactPage;
  tab4Root: any = MemoPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}