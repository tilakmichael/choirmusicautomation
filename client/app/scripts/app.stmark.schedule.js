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
var AppSch = (function () {
    function AppSch(_common, _data, _bldr) {
        this._common = _common;
        this._data = _data;
        this._bldr = _bldr;
        this.alldata = [];
        this.allEdata = [];
        this.schData = [];
        this.error = [];
        this.hymnsData = [];
        this.gropData = [];
        this.table = 'schedule';
        this.editFlag = false;
        this.editId = undefined;
        this.emptyData = { "_id": "-1", "date": "", "name": "", "enterance": "", "offertory": "", "communion": "", "sending": "", "name1": "", "song1": "", "name2": "", "song2": "", "name3": "", "song3": "", "responsorial": "", "mailed": false, "mailedt": "", "choir": "" };
        this.pager = {};
    }
    ;
    AppSch.prototype.ngOnInit = function () {
        var _this = this;
        this.choir = this._common.getChoir();
        console.log('choir ' + this.choir);
        if (!this.choir) {
            console.log('calling profile ');
            this._data.setProfile();
            this.choir = this._common.getChoir();
            console.log('choir ' + this.choir);
        }
        //console.log('Data ') ; 
        this._data.getData(this.table).subscribe(function (data) {
            _this.alldata = data;
            //this.alldata.push(data) ; // = data.map( (_data:any) => {return _data} )  ;
            _this.allEdata = data;
            //data.map( (_data:any) => {return _data} )  ;
            //console.log(this.alldata) ;
            //console.log('length ', this.alldata.length ) ;
            if (_this.alldata.length > 0) {
                _this.allEdata = JSON.parse(JSON.stringify(data));
                _this.setPage(1);
                console.log('data length ', _this.alldata.length);
            }
            _this._data.getData('hymns').subscribe(function (data) {
                _this.hymnsData = data;
                //data.map( (_data:any) => {return _data} )  ;
                console.log('hymn length ', _this.hymnsData.length);
                _this._data.getData('groups').subscribe(function (data) {
                    _this.gropData = data;
                    //data.map( (_data:any) => {return _data} )  ;
                    console.log('hymn length ', _this.hymnsData.length);
                });
            });
        });
    };
    AppSch.prototype.initData = function (editFlag, index) {
        this.editFlag = false;
        this.editId = null;
        if (editFlag) {
            //let data =   this._bldr.group( this.schData[index] ) ;
            var data = this.schData[index];
            data['mailed'] = false;
            this.formDatas = this._bldr.group(data);
            this.editId = this.schData[index]._id;
            this.editFlag = true;
        }
    };
    AppSch.prototype.addData = function () {
        this.initData(false, undefined);
        this.editFlag = true;
        this.editId = '-1';
        var data = JSON.parse(JSON.stringify(this.emptyData));
        if (this.choir) {
            data.choir = this.choir;
        }
        this.schData.unshift(data);
        this.formDatas = this._bldr.group(data);
        console.log('edit id ', this.editId, this.editFlag);
    };
    AppSch.prototype.editData = function (id, index) {
        this.initData(true, index);
        this.editFlag = true;
    };
    AppSch.prototype.deleteData = function (id, index) {
        var _this = this;
        this.editFlag = true;
        this.editId = '-1';
        if (id == '-1') {
            this.schData.splice(index, 1);
        }
        else {
            var name_1 = this.schData[index].name;
            if (confirm('Confirm of deleting: ' + name_1 + '?')) {
                this._data.deleteData(this.table, id).subscribe(function (_data) {
                    _this.schData.splice(index, 1);
                    var success = _this._common.deleteIndex(_this.addData, '_id == "' + id + '"');
                    if (!success) {
                        console.log('Not ablee to delete the Array');
                    }
                });
            }
        }
        this.cancelData(undefined, undefined);
        if (this.alldata.length > 10) {
            this.setPage(this.pager.curentPage);
        }
    };
    ;
    AppSch.prototype.saveData = function (id, index) {
        var _this = this;
        console.log('Save ', id, index);
        var data = this.formDatas.value;
        if (id == '-1') {
            //console.log('insert ', data.fname );
            this._data.addData(this.table, data).subscribe(function (_data) {
                // console.log(_data) ; 
                data._id = _data['_id'].value;
                _this.schData[index] = data;
                _this.alldata.unshift(data);
                if (_this.alldata.length > 10) {
                    _this.setPage(_this.pager.curentPage);
                }
            });
        }
        else {
            //console.log('update ', data.fname );
            this._data.editData(this.table, data).subscribe(function (_data) {
                console.log(_data);
                _this.schData[index] = data;
                var success = _this._common.findUpdate(_this.alldata, '_id=="' + id + '"', data);
                if (!success) {
                    console.log('Not ablee to update the Array');
                }
            });
        }
        this.cancelData(undefined, undefined);
    };
    AppSch.prototype.chekChildData = function (id, index) {
    };
    AppSch.prototype.cancelData = function (id, index) {
        if (id == '-1') {
            this.schData.splice(index, 1);
        }
        this.initData(false, undefined);
    };
    AppSch.prototype.filterData = function (value) {
        if (value) {
            this.alldata = this.allEdata.filter(function (_data) { return (_data.name.toUpperCase()).includes(value.toUpperCase()); });
            this.setPage(1);
        }
        else {
            if (this.searchDate) {
                this.filterDate(this.searchDate);
            }
            else {
                this.alldata = this.allEdata.map(function (_data) { return _data; });
                this.setPage(this.pager.curentPage);
            }
        }
    };
    AppSch.prototype.filterDate = function (value) {
        if (value) {
            this.alldata = this.allEdata.filter(function (_data) { return _data.date == value; });
            this.setPage(1);
        }
        else {
            if (this.searchName) {
                this.filterData(this.searchName);
            }
            else {
                this.alldata = this.allEdata.map(function (_data) { return _data; });
                this.setPage(this.pager.curentPage);
            }
        }
    };
    AppSch.prototype.mailData = function (id, index) {
        var _this = this;
        var sucees = false;
        var data = this.schData[index];
        this._data.mailData(id).subscribe(function (_data) {
            console.log(_data);
            sucees = _data['success'];
            console.log('sucess ' + sucees);
            if (sucees) {
                data['mailed'] = true;
                _this.formDatas = _this._bldr.group(data);
                ;
                _this.saveData(id, index);
            }
        });
    };
    AppSch.prototype.goHome = function () {
        this._common.goHome();
    };
    AppSch.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._common.getPager(this.alldata.length, page);
        this.schData = this.alldata.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    return AppSch;
}());
AppSch = __decorate([
    core_1.Component({
        selector: 'APP-SCH',
        templateUrl: 'app/views/app.stmark.sch.html'
    }),
    __metadata("design:paramtypes", [app_common_service_1.AppCommonService, app_data_service_1.AppDataService, forms_1.FormBuilder])
], AppSch);
exports.AppSch = AppSch;
;
//# sourceMappingURL=app.stmark.schedule.js.map