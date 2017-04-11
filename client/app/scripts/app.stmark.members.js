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
var AppMembers = (function () {
    function AppMembers(_common, _data, _bldr) {
        this._common = _common;
        this._data = _data;
        this._bldr = _bldr;
        this.alldata = [];
        this.allEData = [];
        this.choirData = [];
        this.error = [];
        this.memberData = [];
        this.table = 'members';
        this.editFlag = false;
        this.editId = undefined;
        this.emptyData = { "_id": "-1", "fname": "", "lname": "", "email": "", "phone": "", "dob": "", "admin": "", "active": "true", "trait": "", "choir": "", "resp": "", "demo": "" };
        this.pager = {};
    }
    ;
    AppMembers.prototype.ngOnInit = function () {
        var _this = this;
        this.choir = this._common.getChoir();
        console.log('choir ' + this.choir);
        if (!this.choir) {
            console.log('caalling profile ');
            this._data.setProfile();
            this.choir = this._common.getChoir();
            console.log('choir ' + this.choir);
        }
        //console.log('Data ') ; 
        this._data.getData(this.table).subscribe(function (data) {
            _this.alldata = data; // data.map( (_data:any) => {return _data} )  ;
            //console.log(this.alldata) ;
            //console.log('length ', this.alldata.length ) ;
            if (_this.alldata.length > 0) {
                _this.allEData = JSON.parse(JSON.stringify(data));
                _this.setPage(1);
                console.log('members length ', _this.memberData.length);
            }
        });
        this._data.getData('groups').subscribe(function (data) {
            _this.choirData = data; //data.map( (_data:any) => {return _data} )  ;
            //console.log('choir length ', this.choirData.length ) ;
        });
        //console.log(this.alldata) ; 
    };
    AppMembers.prototype.initData = function (editFlag, index) {
        this.editFlag = false;
        this.editId = null;
        if (editFlag) {
            this.formDatas = this._bldr.group(this.memberData[index]);
            this.editId = this.memberData[index]._id;
            this.editFlag = true;
        }
    };
    AppMembers.prototype.addData = function () {
        this.initData(false, undefined);
        this.editFlag = true;
        this.editId = '-1';
        var data = JSON.parse(JSON.stringify(this.emptyData));
        if (this.choir) {
            data.choir = this.choir;
        }
        this.memberData.unshift(data);
        this.formDatas = this._bldr.group(data);
    };
    AppMembers.prototype.editData = function (id, index) {
        this.initData(true, index);
        this.editFlag = true;
    };
    AppMembers.prototype.deleteData = function (id, index) {
        var _this = this;
        this.editFlag = true;
        this.editId = '-1';
        if (id == '-1') {
            this.memberData.splice(index, 1);
        }
        else {
            var name_1 = this.memberData[index].fname + ' ' + this.memberData[index].lname;
            if (confirm('Confirm of deleting: ' + name_1 + '?')) {
                this._data.deleteData(this.table, id).subscribe(function (_data) {
                    _this.memberData.splice(index, 1);
                    var success = _this._common.deleteIndex(_this.alldata, '_id == "' + id + '"');
                    if (!success) {
                        console.log('Not ablee to delete the Array');
                    }
                    success = _this._common.deleteIndex(_this.allEData, '_id == "' + id + '"');
                });
            }
        }
        this.cancelData(undefined, undefined);
        if (this.alldata.length > 10) {
            this.setPage(this.pager.curentPage);
        }
    };
    ;
    AppMembers.prototype.saveData = function (id, index) {
        //console.log('Save ', id , index );
        var _this = this;
        var data = this.formDatas.value;
        if (this._common.findDuplicate(this.alldata, 'email.toUpperCase() =="' + data.email.toUpperCase() + '"', id)) {
            alert('The Email exists, please enter unique name');
            return;
        }
        ;
        if (id == '-1') {
            //console.log('insert ', data.fname );
            this._data.addData(this.table, data).subscribe(function (_data) {
                console.log(_data["_id"]);
                console.log(_data["_id"].value);
                data._id = _data["_id"].value;
                _this.memberData[index] = data;
                _this.alldata.unshift(data);
                if (_this.alldata.length > 10) {
                    _this.setPage(_this.pager.curentPage);
                }
                _this.allEData.unshift(data);
            });
        }
        else {
            //console.log('update ', data.fname );
            this._data.editData(this.table, data).subscribe(function (_data) {
                //console.log(_data) ; 
                _this.memberData[index] = data;
                var success = _this._common.findUpdate(_this.alldata, '_id=="' + id + '"', data);
                if (!success) {
                    console.log('Not ablee to update the Array');
                }
                success = _this._common.findUpdate(_this.allEData, '_id=="' + id + '"', data);
            });
        }
        this.cancelData(undefined, undefined);
    };
    AppMembers.prototype.cancelData = function (id, index) {
        if (id == '-1') {
            this.memberData.splice(index, 1);
        }
        this.initData(false, undefined);
    };
    AppMembers.prototype.filterData = function (value) {
        if (value) {
            this.alldata = this.allEData.filter(function (_data) { return (_data.fname.toUpperCase() + _data.lname.toUpperCase()).includes(value.toUpperCase()); });
            this.setPage(1);
        }
        else {
            this.alldata = this.allEData.map(function (_data) { return _data; });
            this.setPage(this.pager.curentPage);
        }
    };
    AppMembers.prototype.goHome = function () {
        this._common.goHome();
    };
    AppMembers.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._common.getPager(this.alldata.length, page);
        this.memberData = this.alldata.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    return AppMembers;
}());
AppMembers = __decorate([
    core_1.Component({
        selector: 'APP-MEMBERS',
        templateUrl: 'app/views/app.stmark.members.html'
    }),
    __metadata("design:paramtypes", [app_common_service_1.AppCommonService, app_data_service_1.AppDataService, forms_1.FormBuilder])
], AppMembers);
exports.AppMembers = AppMembers;
;
//# sourceMappingURL=app.stmark.members.js.map