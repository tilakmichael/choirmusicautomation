"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var angular2_jwt_1 = require("angular2-jwt");
var router_1 = require("@angular/router");
require("rxjs/add/operator/filter");
var Auth = (function () {
    function Auth(router) {
        var _this = this;
        this.router = router;
        // Configure Auth0
        // public authkey:string = process.env.AUTH_KEY; 
        // public authdomain:string=process.env.AUTH_DOMAIN  ;
        // lock = new Auth0Lock(this.authkey, this.authdomain, {});
        this.lock = new Auth0Lock('5IYC3fNFkTXjV36YDUA7O4FrhlllgLcI', 'tilakmichael.auth0.com', {});
        this
            .router
            .events
            .filter(function (event) { return event instanceof router_1.NavigationStart; })
            .filter(function (event) { return (/access_token|id_token|error/).test(event.url); })
            .subscribe(function () {
            _this.lock.resumeAuth(window.location.hash, function (error, authResult) {
                if (error)
                    return console.log(error);
                localStorage.setItem('id_token', authResult.idToken);
                _this.router.navigate(['/']);
            });
        });
        this.lock.on("authenticated", function (authResult) {
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    throw new Error(error);
                }
                console.log(profile);
                var email = profile['email'];
                if (email.toUpperCase() == 'DEMOPERSON@HOTMAIL.COM') {
                    profile.demo = 'Y';
                    console.log('Demo');
                }
                else {
                    profile.demo = undefined;
                }
                console.log(angular2_jwt_1.tokenNotExpired());
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('profile', JSON.stringify(profile));
                console.log(profile);
                console.log(authResult.idToken);
                console.log(angular2_jwt_1.tokenNotExpired());
            });
        });
    }
    Auth.prototype.login = function () {
        // Call the show method to display the widget.
        this.lock.show();
    };
    Auth.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        //console.log('in authentication') ;
        //console.log( tokenNotExpired()) ;
        //console.log(localStorage.getItem('id_token')) ; 
        var jwtHelper = new angular2_jwt_1.JwtHelper();
        var token = localStorage.getItem('id_token');
        var retval = false;
        if (token) {
            if (!jwtHelper.isTokenExpired(token)) {
                retval = true;
            }
        }
        //return tokenNotExpired();
        //console.log(localStorage.getItem('id_token')) ; 
        //if (localStorage.getItem('id_token')){
        //  retval = true ; 
        // }
        //console.log( retval ) ; 
        return retval;
    };
    Auth.prototype.logout = function () {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        //alert('Thank you, please let us know if you have any comments');
    };
    return Auth;
}());
Auth = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=app.auth.service.js.map