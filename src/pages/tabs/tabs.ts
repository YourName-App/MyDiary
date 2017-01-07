import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DiaryPage } from '../diary/diary';
import { ContactListPage } from '../contact-list/contact-list';
import { MemoListPage } from '../memo-list/memo-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = HomePage;
  tab2Root: any = DiaryPage;
  tab3Root: any = ContactListPage;
  tab4Root: any = MemoListPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
