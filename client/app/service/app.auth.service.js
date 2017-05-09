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
        this.lock = new Auth0Lock('XXXXXXXXXXXXXXXX', 'YYYYYYYYYYY.auth0.com', {});
        this.router.events.filter(function (event) { return event instanceof router_1.NavigationStart; })
            .filter(function (event) { return (/access_token|id_token|error/).test(event.url); })
            .subscribe(function () {
            _this.lock.resumeAuth(window.location.hash, function (error, authResult) {
                if (error) {
                    return;
                }
                localStorage.setItem('id_token', authResult.idToken);
                _this.router.navigate(['/']);
            });
        });
        this.lock.on("authenticated", function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                localStorage.setItem('profile', JSON.stringify(profile));
                if (error) {
                    throw new Error(error);
                }
                //console.log(profile) ;
                var email = profile['email'];
                if (email.toUpperCase() == 'DEMOPERSON@HOTMAIL.COM') {
                    profile.demo = 'Y';
                }
                else {
                    profile.demo = undefined;
                }
                localStorage.setItem('profile', JSON.stringify(profile));
            });
        });
    }
    Auth.prototype.login = function () {
        // Call the show method to display the widget.
        this.lock.show();
    };
    Auth.prototype.authenticated = function () {
        return angular2_jwt_1.tokenNotExpired('id_token');
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