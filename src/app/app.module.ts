import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { DiaryPage } from '../pages/diary/diary';
import { EntryPage } from '../pages/entry/entry';
import { CalendarPage } from '../pages/calendar/calendar';
import { EditPage } from '../pages/edit/edit';
import { ContentPage } from '../pages/content/content';
import { ContactPage } from '../pages/contact/contact';
import { MemoPage } from '../pages/memo/memo';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    DiaryPage,
    EntryPage,
    CalendarPage,
    EditPage,
    ContentPage,
    ContactPage,
    MemoPage
  ],
  imports: [
    // Set the whole app in iOS's style
    IonicModule.forRoot(MyApp, {mode: 'ios'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    DiaryPage,
    EntryPage,
    CalendarPage,
    EditPage,
    ContentPage,
    ContactPage,
    MemoPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
