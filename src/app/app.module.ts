import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Import pages
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { DiaryPage } from '../pages/diary/diary';
import { DiaryEditPage } from '../pages/diary-edit/diary-edit';
import { DiaryListPage } from '../pages/diary-list/diary-list';
import { DiaryDetailPage } from '../pages/diary-detail/diary-detail';
import { MemoEditPage } from '../pages/memo-edit/memo-edit';
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
import { SettingPage } from '../pages/setting/setting';

// Import providers
import { AuthService } from '../providers/auth-service';
import { MemoService } from '../providers/memo-service';
import { ContactService } from '../providers/contact-service';
import { SettingService } from '../providers/setting-service';

// Import AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAH_5gOCh7q2H8QbTMxL9mnIiMGgpWrLxM",
  authDomain: "mydiary-a1f05.firebaseapp.com",
  databaseURL: "https://mydiary-a1f05.firebaseio.com",
  storageBucket: "mydiary-a1f05.appspot.com",
  messagingSenderId: "512503281937"
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
    SettingPage
  ],
  imports: [
    // Set the whole app in iOS's style
    IonicModule.forRoot(MyApp, {mode: 'ios', backButtonText: '返回',}),
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
    SettingPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    MemoService,
    ContactService,
    SettingService
  ]
})
export class AppModule {}
