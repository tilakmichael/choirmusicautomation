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
var Auth = (function () {
    function Auth() {
        // Add callback for lock `authenticated` event
        //console.log('Mongo URL : ' +  config.mongo.url) ;
        var _this = this;
        // Configure Auth0
        this.authkey = process.env.AUTH_KEY || '3iBRZy3N2NguzPBFV3xb95IJgo2laYEZ';
        this.authdomain = process.env.AUTH_DOMAIN || 'tilakmichael.auth0.com';
        this.lock = new Auth0Lock(this.authkey, this.authdomain, {});
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
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('profile', JSON.stringify(profile));
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
        return angular2_jwt_1.tokenNotExpired();
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
    __metadata("design:paramtypes", [])
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=app.auth.service.js.map