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
var router_1 = require("@angular/router");
var app_auth_service_1 = require("../service/app.auth.service");
var app_common_service_1 = require("../service/app.common.service");
var app_data_service_1 = require("../service/app.data.service");
var AppHome = (function () {
    function AppHome(_auth, _router, _common, _data) {
        this._auth = _auth;
        this._router = _router;
        this._common = _common;
        this._data = _data;
        this.groupName = '1130 Choir';
    }
    AppHome.prototype.ngOnInit = function () {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        if (this.profile) {
            this.name = this.profile['name'];
            this.pict = this.profile['picture'];
            var choir = this._common.getChoir();
            if (!choir) {
                if (this._auth.authenticated()) {
                }
                else {
                }
            }
            else {
                this.groupName = choir;
            }
        }
    };
    return AppHome;
}());
AppHome = __decorate([
    core_1.Component({
        selector: 'APP-HOME',
        templateUrl: 'app/views/app.stmark.home.html'
    }),
    __metadata("design:paramtypes", [app_auth_service_1.Auth, router_1.Router, app_common_service_1.AppCommonService, app_data_service_1.AppDataService])
], AppHome);
exports.AppHome = AppHome;
//# sourceMappingURL=app.stmark.home.js.map