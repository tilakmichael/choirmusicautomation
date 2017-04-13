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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var app_common_service_1 = require("../service/app.common.service");
var angular2_jwt_1 = require("angular2-jwt");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
//import 'rxjs/add/Observable/throw';
var AppDataService = (function () {
    function AppDataService(http, _common, authhttp) {
        this.http = http;
        this._common = _common;
        this.authhttp = authhttp;
        this.data = [];
    }
    ;
    AppDataService.prototype.getData = function (table) {
        //console.log('calling rest get for table '+table ) ; 
        //let token  = localStorage.getItem('id_token');
        //console.log(token) ;
        //let headers = new Headers({ 'Authorization': 'Bearer ' + token});
        //let options = new RequestOptions({ headers: headers });
        var url = this.getUrl(table);
        return this.authhttp.get(url)
            .map(function (resp) { return resp.json(); })
            .catch(function (error) {
            console.error(error);
            return error.json();
            //return Observable.throw(error);
        });
    };
    ;
    AppDataService.prototype.addData = function (table, data) {
        //console.log('calling rest for adding table '+table ) ; 
        var url = this.getUrl(table);
        var header = new http_1.Headers();
        header.append('content-type', 'application/json');
        return this.authhttp.post(url, JSON.stringify(data), { headers: header })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) {
            console.error(error);
            return error.json();
            //return Observable.throw(error);
        });
    };
    ;
    AppDataService.prototype.editData = function (table, data) {
        //console.log('calling rest for updating for table '+table ) ; 
        var url = this.getUrl(table);
        var header = new http_1.Headers();
        header.append('content-type', 'application/json');
        return this.authhttp.put(url, JSON.stringify(data), { headers: header })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) {
            console.error(error);
            return error.json();
            //return Observable.throw(error);
        });
    };
    ;
    AppDataService.prototype.deleteData = function (table, id) {
        //console.log('calling rest delete for table '+table ) ;
        var url = this.getUrl(table);
        url = url + id;
        var header = new http_1.Headers();
        header.append('content-type', 'application/json');
        return this.authhttp.delete(url)
            .map(function (resp) { return resp.json(); })
            .catch(function (error) {
            console.error(error);
            return error.json();
            // return Observable.throw(error);
        });
    };
    ;
    AppDataService.prototype.mailData = function (id) {
        console.log('calling mail ' + id);
        var url = this.getUrl('email');
        url = url + id;
        console.log('url ' + url);
        var header = new http_1.Headers();
        header.append('content-type', 'application/json');
        return this.authhttp.post(url, null, { headers: header })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) {
            console.error(error);
            //return error.json() ;
            return Observable_1.Observable.throw(error);
        });
    };
    ;
    AppDataService.prototype.getUrl = function (table) {
        var url = this._common.getUrl();
        return url + table + '/';
    };
    AppDataService.prototype.setProfile = function () {
        var _this = this;
        var retval = false;
        var profile = JSON.parse(localStorage.getItem('profile'));
        var email = profile.email;
        var allData = [];
        var memberData = [];
        this.getData('members').subscribe(function (data) {
            allData = data; //.map( (_data:any) => {return _data} )  ;
            memberData = allData.filter(function (_data) { return _data.email == email; });
            if (memberData.length >= 0) {
                _this._common.setChoir(memberData[0].choir);
                _this._common.setadmin(memberData[0].admin);
                _this._common.setdemo((memberData[0].demo ? 'Y' : null));
                profile.choir = memberData[0].choir;
                profile.admin = memberData[0].admin;
                profile.demo = (memberData[0].demo ? 'Y' : profile.demo);
                localStorage.setItem('profile', JSON.stringify(profile));
                retval = true;
            }
        });
    };
    return AppDataService;
}());
AppDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_common_service_1.AppCommonService, angular2_jwt_1.AuthHttp])
], AppDataService);
exports.AppDataService = AppDataService;
//# sourceMappingURL=app.data.service.js.map