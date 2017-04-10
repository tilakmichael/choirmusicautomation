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
var forms_1 = require("@angular/forms");
var app_data_service_1 = require("../service/app.data.service");
var app_common_service_1 = require("../service/app.common.service");
var AppSchRpt = (function () {
    function AppSchRpt(_common, _data, _bldr) {
        this._common = _common;
        this._data = _data;
        this._bldr = _bldr;
        this.alldata = [];
        this.allEdata = [];
        this.schData = [];
        this.error = [];
        this.hymnsData = [];
        this.table = 'schedule';
        this.editFlag = false;
        this.editId = undefined;
        this.pager = {};
        this.today = new Date();
        this.day = this.today.getDay();
    }
    ;
    AppSchRpt.prototype.ngOnInit = function () {
        var _this = this;
        //console.log('init Data ') ; 
        this._data.getData('hymns').subscribe(function (data) {
            _this.hymnsData = data; // data.map( (_data:any) => {return _data} )  ;
            //console.log('hymn length ', this.hymnsData.length ) ;
        });
        this._data.getData(this.table).subscribe(function (data) {
            //this.alldata =  data ; // data.map( (_data:any) => {return _data} )  ;
            _this.allEdata = data; // data.map( (n_data:any) => {return _data} )  ;
            //console.log(this.alldata) ;
            //console.log('length ', this.allEdata.length ) ;
            if (_this.allEdata.length > 0) {
                _this.fromDate = _this._common.addDate(_this.today, _this.day * -1);
                _this.endDate = _this._common.addDate(_this.today, 30);
                _this.alldata = _this.allEdata.filter(function (data) { return data.date >= _this.fromDate && data.date <= _this.endDate; });
                //console.log('data length ', this.alldata.length ) ;
                //console.log('data2 length ', this.allEdata.length ) ;
                //this.alldata  = this.allEdata ;
                _this.initTable();
            }
        });
    };
    AppSchRpt.prototype.initData = function (idx) {
        //console.log('inittable ' + idx + ' / ' + this.schData.length ) ;
        this.date = this.schData[idx].date;
        this.name = this.schData[idx].name;
        this.enterance = this.schData[idx].enterance;
        this.enteranceLnk = this.schData[idx].enteranceLnk;
        this.offertory = this.schData[idx].offertory;
        this.communion = this.schData[idx].communion;
        this.sending = this.schData[idx].sending;
        this.name1 = this.schData[idx].name1;
        this.song1 = this.schData[idx].song1;
        this.name2 = this.schData[idx].name2;
        this.song2 = this.schData[idx].song2;
        this.offertoryLnk = this.schData[idx].offertoryLnk;
        this.communionLnk = this.schData[idx].communionLnk;
        this.sendingLnk = this.schData[idx].sendingLnk;
        if (this.song1) {
            this.song1Lnk = this.schData[idx].song1Lnk;
        }
        if (this.song1) {
            this.song2Lnk = this.schData[idx].song2Lnk;
        }
    };
    AppSchRpt.prototype.initTable = function () {
        this.maxNo = this.alldata.length - 1;
        //console.log('inittable ' + this.maxNo + ' / ' + this.alldata.length ) ;
        if (this.alldata.length == 0) {
            return;
        }
        this.schData = [];
        for (var i = 0; i <= this.maxNo; i++) {
            var data = this.alldata[i];
            var _data = this.alldata[i];
            var indx = this._common.findIndex(this.hymnsData, '_id=="' + _data.enterance + '"');
            if (indx >= 0) {
                data.enterance = this.hymnsData[indx].name;
                data.enteranceLnk = this.hymnsData[indx].songsheet;
            }
            indx = this._common.findIndex(this.hymnsData, '_id=="' + _data.offertory + '"');
            if (indx >= 0) {
                data.offertory = this.hymnsData[indx].name;
                data.offertoryLnk = this.hymnsData[indx].songsheet;
            }
            indx = this._common.findIndex(this.hymnsData, '_id=="' + _data.communion + '"');
            if (indx >= 0) {
                data.communion = this.hymnsData[indx].name;
                data.communionLnk = this.hymnsData[indx].songsheet;
            }
            indx = this._common.findIndex(this.hymnsData, '_id=="' + _data.sending + '"');
            if (indx >= 0) {
                data.sending = this.hymnsData[indx].name;
                data.sendingLnk = this.hymnsData[indx].songsheet;
            }
            if (data.song1) {
                indx = this._common.findIndex(this.hymnsData, '_id=="' + _data.song1 + '"');
                if (indx >= 0) {
                    data.song1 = this.hymnsData[indx].name;
                    data.song1Lnk = this.hymnsData[indx].songsheet;
                }
            }
            if (data.song2) {
                indx = this._common.findIndex(this.hymnsData, '_id=="' + _data.song2 + '"');
                if (indx >= 0) {
                    data.song2 = this.hymnsData[indx].name;
                    data.song2Lnk = this.hymnsData[indx].songsheet;
                }
            }
            //console.log('inittable '   + this.schData.length ) ;
            this.schData.push(data);
        }
        ;
        //console.log('exit inittable ' + this.schData.length ) ;
        this.initData(0);
        this.index = 0;
    };
    AppSchRpt.prototype.nextDoc = function () {
        //alert('next  ' +this.index + ' '+ this.maxNo + '/'+this.schData.length) ;
        if (this.index < this.maxNo) {
            this.index = this.index + 1;
            this.initData(this.index);
        }
    };
    AppSchRpt.prototype.prevDoc = function () {
        //alert('prev ' + this.index + ' '+ this.maxNo +' /'+this.schData.length) ;
        if (this.index > 0) {
            this.index = this.index - 1;
            this.initData(this.index);
        }
    };
    AppSchRpt.prototype.filterFromDate = function (value) {
        if (value) {
            this.alldata = this.alldata.filter(function (_data) { return (_data.date >= value); });
            this.initTable();
        }
        else {
            if (this.endDate) {
                this.filterEndDate(this.endDate);
            }
            else {
                this.alldata = this.allEdata.map(function (_data) { return _data; });
                this.initTable();
            }
        }
    };
    AppSchRpt.prototype.filterEndDate = function (value) {
        //alert(value) ;
        if (value) {
            this.alldata = this.alldata.filter(function (_data) { return _data.date <= value; });
            this.initTable();
        }
        else {
            if (this.endDate) {
                this.filterFromDate(this.fromDate);
            }
            else {
                this.alldata = this.allEdata.map(function (_data) { return _data; });
                this.initTable();
            }
        }
    };
    AppSchRpt.prototype.goHome = function () {
        this._common.goHome();
    };
    AppSchRpt.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._common.getPager(this.alldata.length, page);
        this.schData = this.alldata.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    return AppSchRpt;
}());
AppSchRpt = __decorate([
    core_1.Component({
        selector: 'APP-SCH-REP',
        templateUrl: 'app/views/app.stmark.sch.rpt.html'
    }),
    __metadata("design:paramtypes", [app_common_service_1.AppCommonService, app_data_service_1.AppDataService, forms_1.FormBuilder])
], AppSchRpt);
exports.AppSchRpt = AppSchRpt;
;
//# sourceMappingURL=app.stmark.sch.rpt.js.map