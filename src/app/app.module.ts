import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { SegmentPage } from "../pages/segment/segment";
import { HomePage } from "../pages/home/home";
import { EntryPage } from "../pages/entry/entry";
import { CalendarPage } from "../pages/calendar/calendar";
import { DiaryPage } from "../pages/diary/diary";

@NgModule({
  declarations: [
    MyApp,
    SegmentPage,
    HomePage,
    EntryPage,
    CalendarPage,
    DiaryPage
  ],
  imports: [
    // Set the whole app in iOS's style
    IonicModule.forRoot(MyApp, {mode: "ios"})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SegmentPage,
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
