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
var app_common_service_1 = require("../service/app.common.service");
var AppAboutMe = (function () {
    function AppAboutMe(_common) {
        this._common = _common;
        this.profileObj = {};
    }
    ;
    AppAboutMe.prototype.ngOnInit = function () {
        this.profile = localStorage.getItem('profile');
        //console.log(this.profile);
        if (this.profile) {
            this.profileObj = JSON.parse(this.profile);
            //console.log('in') ;
            //console.log(this.profileObj) ;    
            this.fullName = this.profileObj['name'];
            this.alias = this.profileObj['nickname'];
            this.gender = this.profileObj['gender'];
            this.pict = this.profileObj['picture'];
            this.email = this.profileObj['email'];
            this.demo = this.profileObj['demo'];
            this.choir = this.profileObj['choir'];
        }
    };
    AppAboutMe.prototype.goHome = function () {
        this._common.goHome();
    };
    ;
    return AppAboutMe;
}());
AppAboutMe = __decorate([
    core_1.Component({
        selector: 'APP-ME',
        templateUrl: 'app/views/app.stmark.about.me.html'
    }),
    __metadata("design:paramtypes", [app_common_service_1.AppCommonService])
], AppAboutMe);
exports.AppAboutMe = AppAboutMe;
//# sourceMappingURL=app.about.me.js.map