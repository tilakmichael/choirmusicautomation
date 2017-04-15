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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var AppCommonService = (function () {
    function AppCommonService(_date, _router) {
        this._date = _date;
        this._router = _router;
        //public url:string = "http://localhost:3000/api/acc/v1/";
        this.url = "/api/stm/mlab/";
        this.doc = {};
    }
    AppCommonService.prototype.range = function (start, count) {
        return Array.apply(0, Array(count))
            .map(function (element, index) {
            return (index + start);
        });
    };
    AppCommonService.prototype.goHome = function () {
        this._router.navigateByUrl('home');
    };
    AppCommonService.prototype.sqlDt2Jdt = function (date) {
        if (date == null || date == undefined || !date) {
            return;
        }
        var jsDate = this._date.transform(date, 'yyyy-MM-dd');
        //console.log(jsDate) ;
        return jsDate;
    };
    AppCommonService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        }
        else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 6;
            }
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = 10;
            }
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        var pages = this.range(startPage, endPage);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };
    AppCommonService.prototype.findIndex = function (doc, filter) {
        //console.log('filter : ' +  filter) ;
        filter = '_doc.' + filter.trim();
        //console.log(filter) ;
        var index = doc.findIndex(function (_doc) { return eval(filter); });
        //console.log( 'fndindex' + index) ;
        return index;
    };
    AppCommonService.prototype.deleteIndex = function (doc, filter) {
        var indx = this.findIndex(doc, filter);
        var retval = false;
        if (indx >= 0) {
            doc.splice(indx, 1);
            retval = true;
        }
        return retval;
    };
    AppCommonService.prototype.findUpdate = function (doc, filter, data) {
        var indx = this.findIndex(doc, filter);
        var retval = false;
        if (indx >= 0) {
            doc[indx] = data;
            retval = true;
        }
        return retval;
    };
    AppCommonService.prototype.findDuplicate = function (doc, filter, id) {
        var indx = this.findIndex(doc, filter);
        var retval = false;
        if (indx >= 0) {
            if (doc[indx]._id != id) {
                console.log(doc[indx]._id, id);
                retval = true;
            }
        }
        return retval;
    };
    AppCommonService.prototype.addDate = function (date, day) {
        //console.log('in date', date);
        var dt = date;
        dt.setDate(dt.getDate() + day);
        //console.log('ret date', date);
        return this.sqlDt2Jdt(date);
    };
    AppCommonService.prototype.getUrl = function () {
        return this.url;
    };
    ;
    AppCommonService.prototype.getgroupName = function () {
        return this.groupName;
    };
    ;
    AppCommonService.prototype.getuserMail = function () {
        return this.userMail;
    };
    ;
    AppCommonService.prototype.getadmin = function () {
        return this.admin;
    };
    ;
    AppCommonService.prototype.getdemo = function () {
        if (!this.demo) {
            var profile = JSON.parse(localStorage.getItem('profile'));
            this.demo = 'N';
            if (profile.demo) {
                this.demo = (profile.demo == 'Y' ? 'Y' : 'N');
            }
        }
        return this.demo;
    };
    ;
    AppCommonService.prototype.getchoirMaster = function () {
        return this.choirMaster;
    };
    ;
    AppCommonService.prototype.setgroupName = function (name) {
        this.groupName = name;
    };
    ;
    AppCommonService.prototype.setuserMail = function (mail) {
        this.userMail = mail;
    };
    ;
    AppCommonService.prototype.setadmin = function (admin) {
        this.admin = admin;
    };
    ;
    AppCommonService.prototype.setdemo = function (demo) {
        this.demo = demo;
    };
    ;
    AppCommonService.prototype.setchoirMaster = function (flag) {
        this.choirMaster = flag;
    };
    ;
    AppCommonService.prototype.getProfileImage = function () {
        var immage;
        var profile = JSON.parse(localStorage.getItem('profile'));
        if (profile) {
            immage = profile['picture'];
        }
        return immage;
    };
    AppCommonService.prototype.getChoir = function () {
        return this.choir;
    };
    AppCommonService.prototype.setChoir = function (choir) {
        this.choir = choir;
    };
    return AppCommonService;
}());
AppCommonService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [common_1.DatePipe, router_1.Router])
], AppCommonService);
exports.AppCommonService = AppCommonService;
//# sourceMappingURL=app.common.service.js.map