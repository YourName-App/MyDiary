import { Injectable } from '@angular/core';

// Import AF2 Module
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  fireAuth: any;

  constructor(public af: AngularFire) {
    af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;
        console.log(user);
      }
    });
  }

  // Get the currently logged user
  getUser() {
    return this.fireAuth;
  }

  // Log-in a user with email and password
  loginUser(email: string, password: string): any {
    return this.af.auth.login({email, password});
  }

  // Register a user with email and password
  registerUser(userEmail: string, userPassword: string): any {
    return firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword);
  }

  // Log-in a user anonymously
  anonymousLogin() {
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });
  }

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

  // Send a reset password link via email to the user
  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // Log-out from the app
  logoutUser(): any {
    return firebase.auth().signOut();
  }
}
