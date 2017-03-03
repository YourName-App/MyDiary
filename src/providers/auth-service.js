var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
// Import AF2 Module
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
var AuthService = (function () {
    function AuthService(af) {
        var _this = this;
        this.af = af;
        af.auth.subscribe(function (user) {
            if (user) {
                _this.fireAuth = user.auth;
                console.log(user);
            }
        });
    }
    // Get the currently logged user
    AuthService.prototype.getUser = function () {
        return this.fireAuth;
    };
    // Log-in a user with email and password
    AuthService.prototype.loginUser = function (email, password) {
        return this.af.auth.login({ email: email, password: password });
    };
    // Register a user with email and password
    AuthService.prototype.registerUser = function (userEmail, userPassword) {
        return firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword);
    };
    // Log-in a user anonymously
    AuthService.prototype.anonymousLogin = function () {
        return this.af.auth.login({
            provider: AuthProviders.Anonymous,
            method: AuthMethods.Anonymous,
        });
    };
    // Link email and password credentials to an anonymous user
    AuthService.prototype.linkAccount = function (email, password) {
        var userProfile = firebase.database().ref('/userProfile');
        var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        return this.fireAuth.link(credential).then(function (user) {
            userProfile.child(user.uid).update({ email: email });
        }, function (error) {
            console.log("Account linking error", error);
        });
    };
    // Send a reset password link via email to the user
    AuthService.prototype.resetPassword = function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    };
    // Log-out from the app
    AuthService.prototype.logoutUser = function () {
        return firebase.auth().signOut();
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth-service.js.map