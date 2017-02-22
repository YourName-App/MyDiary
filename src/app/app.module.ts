import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';

// Import pages
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { DiaryPage } from '../pages/diary/diary';
import { DiaryEditPage } from '../pages/diary-edit/diary-edit';
import { DiaryListPage } from '../pages/diary-list/diary-list';
import { DiaryDetailPage } from '../pages/diary-detail/diary-detail';
import { MemoEditPage } from '../pages/memo-edit/memo-edit';
import { MemoItemEditPage } from '../pages/memo-item-edit/memo-item-edit';
import { MemoListPage } from '../pages/memo-list/memo-list';
import { MemoDetailPage } from '../pages/memo-detail/memo-detail';
import { ContactEditPage } from '../pages/contact-edit/contact-edit';
import { ContactListPage } from '../pages/contact-list/contact-list';
import { ContactDetailPage } from '../pages/contact-detail/contact-detail';
import { CalendarPage } from '../pages/calendar/calendar';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SuggestPage } from '../pages/suggest/suggest';
import { AboutPage } from '../pages/about/about';
import { UserConfigPage } from '../pages/user-config/user-config';
import { PinConfigPage } from '../pages/pin-config/pin-config';

// Import custom components
import { Autoresize } from '../components/autoresize/autoresize';

// Import providers
import { AuthService } from '../providers/auth-service';
import { DiaryService } from '../providers/diary-service';
import { MemoService } from '../providers/memo-service';
import { ContactService } from '../providers/contact-service';
import { ConfigService } from '../providers/config-service';

// Import pipes
import { ChineseDay } from '../pipes/chinese-day';

// Import AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings (test env)
export const firebaseConfig = {
  apiKey: "AIzaSyDjNlZc4roJUyMZR_5wRoflvWr6kcUnzEw",
  authDomain: "mydiary-1b17a.firebaseapp.com",
  databaseURL: "https://mydiary-1b17a.firebaseio.com",
  storageBucket: "mydiary-1b17a.appspot.com",
  messagingSenderId: "647185474664"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    DiaryPage,
    DiaryEditPage,
    DiaryListPage,
    DiaryDetailPage,
    MemoEditPage,
    MemoItemEditPage,
    MemoListPage,
    MemoDetailPage,
    ContactEditPage,
    ContactListPage,
    ContactDetailPage,
    CalendarPage,
    LandingPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    SuggestPage,
    AboutPage,
    UserConfigPage,
    PinConfigPage,
    Autoresize,
    ChineseDay
  ],
  imports: [
    // Set the whole app in iOS's style
    IonicModule.forRoot(MyApp, {mode: 'ios', backButtonText: ''}),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    DiaryPage,
    DiaryEditPage,
    DiaryListPage,
    DiaryDetailPage,
    MemoEditPage,
    MemoItemEditPage,
    MemoListPage,
    MemoDetailPage,
    ContactEditPage,
    ContactListPage,
    ContactDetailPage,
    CalendarPage,
    LandingPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    SuggestPage,
    AboutPage,
    UserConfigPage,
    PinConfigPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    AuthService,
    DiaryService,
    MemoService,
    ContactService,
    ConfigService
  ]
})
export class AppModule {}
