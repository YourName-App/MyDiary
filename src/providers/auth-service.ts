import { Injectable } from '@angular/core';

// Import AF2 Module
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {

  fireAuth: any;
  
  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.fireAuth = user;
      }
    });
  }

  // Get the currently logged user
  getUser() {
    return this.fireAuth;
  }

  // Log-in a user with email and password
  loginUser(email: string, password: string): any {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // Register a user with email and password
  registerUser(userEmail: string, userPassword: string): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword);
  }

  // Log-in a user anonymously
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously();
  }

  /*
  // Link email and password credentials to an anonymous user
  linkAccount(email: string, password: string): any {
    const userProfile = firebase.database().ref('/userProfile');
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this.fireAuth.link(credential).then((user) => {
      userProfile.child(user.uid).update({email});
    }, (error) => {
      console.log("Account linking error", error);
    });
  }
  */
  
  // Send a reset password link via email to the user
  resetPassword(email: string): any {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  // Log-out from the app
  logoutUser(): any {
    return this.afAuth.auth.signOut();
  }
}
