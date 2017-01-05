import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Import pages
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { DiaryPage } from '../pages/diary/diary';
import { DiaryListPage } from '../pages/diary-list/diary-list';
import { DiaryEditPage } from '../pages/diary-edit/diary-edit';
import { DiaryContentPage } from '../pages/diary-content/diary-content';
import { MemoListPage } from '../pages/memo-list/memo-list';
import { MemoEditPage } from '../pages/memo-edit/memo-edit';
import { MemoContentPage } from '../pages/memo-content/memo-content';
import { CalendarPage } from '../pages/calendar/calendar';
import { ContactPage } from '../pages/contact/contact';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SuggestPage } from '../pages/suggest/suggest';
import { AboutPage } from '../pages/about/about';

// Import providers
import { AuthService } from '../providers/auth-service';

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
    DiaryListPage,
    DiaryEditPage,
    DiaryContentPage,
    MemoListPage,
    MemoEditPage,
    MemoContentPage,
    CalendarPage,
    ContactPage,
    LandingPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    SuggestPage,
    AboutPage
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
    DiaryListPage,
    DiaryEditPage,
    DiaryContentPage,
    MemoListPage,
    MemoEditPage,
    MemoContentPage,
    CalendarPage,
    ContactPage,
    LandingPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    SuggestPage,
    AboutPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
