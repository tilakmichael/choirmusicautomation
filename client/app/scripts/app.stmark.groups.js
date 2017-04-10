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
var app_data_service_1 = require("../service/app.data.service");
var app_common_service_1 = require("../service/app.common.service");
var app_auth_service_1 = require("../service/app.auth.service");
var AppGroup = (function () {
    function AppGroup(_common, _data, _auth) {
        this._common = _common;
        this._data = _data;
        this._auth = _auth;
        this.alldata = [];
        this.error = [];
        this.groupData = [];
        this.memberData = [];
        this.scheduleData = [];
        this.table = 'groups';
        this.name = undefined;
        this.email = undefined;
        this.description = undefined;
        this.editFlag = false;
        this.editId = undefined;
        this.emptyData = { "_id": "-1", "name": "", "email": "", "description": "" };
    }
    ;
    AppGroup.prototype.ngOnInit = function () {
        var _this = this;
        //console.log('Data ') ; 
        this._data.getData(this.table).subscribe(function (data) {
            _this.alldata = data; // data.map( (_data:any) => {return _data} )  ;
            console.log(_this.alldata);
            console.log('length ', _this.alldata.length);
        });
        this._data.getData('members').subscribe(function (data) {
            _this.memberData = data; //data.map( (_data:any) => {return _data} )  ;
            //console.log(this.memberData) ;
            //console.log('length member ', this.memberData.length ) ;  
        });
        this._data.getData('schedule').subscribe(function (data) {
            _this.scheduleData = data; // data.map( (_data:any) => {return _data} )  ;
            //console.log(this.scheduleData) ;
            //console.log('length member ', this.scheduleData.length ) ;  
        });
    };
    ;
    AppGroup.prototype.initData = function (editFlag, index) {
        this.name = null;
        this.email = null;
        this.description = null;
        this.editFlag = false;
        this.editId = null;
        if (editFlag) {
            this.name = this.alldata[index].name;
            this.email = this.alldata[index].email;
            this.description = this.alldata[index].description;
            this.editId = this.alldata[index]._id;
            this.editFlag = true;
        }
    };
    AppGroup.prototype.addData = function () {
        this.initData(false, undefined);
        this.editFlag = true;
        this.editId = '-1';
        var data = JSON.parse(JSON.stringify(this.emptyData));
        this.alldata.push(data);
    };
    AppGroup.prototype.editData = function (id, index) {
        this.initData(true, index);
        this.editFlag = true;
    };
    AppGroup.prototype.deleteData = function (id, index) {
        var _this = this;
        if (this.chekChildData(id)) {
            alert('Reference Exists of this data, can not be deleted');
            return;
        }
        this.editFlag = true;
        this.editId = '-1';
        if (id == '-1') {
            this.alldata.splice(index, 1);
        }
        else {
            if (confirm('Confirm of deleting: ' + this.alldata[index].name + '?')) {
                this._data.deleteData(this.table, id).subscribe(function (_data) {
                    _this.alldata.splice(index, 1);
                });
            }
        }
        this.cancelData(undefined, undefined);
    };
    ;
    AppGroup.prototype.saveData = function (id, index) {
        var _this = this;
        console.log('Save ', id, index);
        if (this._common.findDuplicate(this.alldata, 'name.toUpperCase()=="' + this.name.toUpperCase() + '"', id)) {
            alert('The Name exists, please enter unique name');
            return;
        }
        ;
        var data = this.alldata[index];
        //console.log(data); 
        data.name = this.name;
        data.email = this.email;
        data.description = this.description;
        if (id == '-1') {
            console.log('insert ', data.name);
            this._data.addData(this.table, data).subscribe(function (_data) {
                console.log(_data);
                data._id = _data['_id'].value;
                _this.addData[index] = data;
            });
        }
        else {
            console.log('update ', data.name);
            this._data.editData(this.table, data).subscribe(function (_data) {
                console.log(_data);
                _this.addData[index] = data;
            });
        }
        this.cancelData(undefined, undefined);
    };
    ;
    AppGroup.prototype.chekChildData = function (id) {
        var retval = false;
        var indx = this._common.findIndex(this.memberData, 'choir=="' + id + '"');
        if (indx >= 0) {
            retval = true;
        }
        if (!retval) {
            indx = this._common.findIndex(this.scheduleData, 'choir=="' + id + '"');
            if (indx >= 0) {
                retval = true;
            }
        }
        return retval;
    };
    ;
    AppGroup.prototype.cancelData = function (id, index) {
        if (id == '-1') {
            this.alldata.splice(index, 1);
        }
        this.initData(false, undefined);
    };
    ;
    AppGroup.prototype.goHome = function () {
        this._common.goHome();
    };
    ;
    return AppGroup;
}());
AppGroup = __decorate([
    core_1.Component({
        selector: 'APP-GROUP',
        templateUrl: 'app/views/app.stmark.groups.html'
    }),
    __metadata("design:paramtypes", [app_common_service_1.AppCommonService, app_data_service_1.AppDataService, app_auth_service_1.Auth])
], AppGroup);
exports.AppGroup = AppGroup;
;
//# sourceMappingURL=app.stmark.groups.js.map