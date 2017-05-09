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
var AppHymns = (function () {
    function AppHymns(_common, _data, _bldr) {
        this._common = _common;
        this._data = _data;
        this._bldr = _bldr;
        this.alldata = [];
        this.allEdata = [];
        this.choirData = [];
        this.error = [];
        this.hymnsData = [];
        this.table = 'hymns';
        this.editFlag = false;
        this.editId = undefined;
        this.emptyData = { "_id": "-1", "name": "", "author": "", "songsheet": "", "song": "", "pattern": "" };
        this.pager = {};
    }
    ;
    AppHymns.prototype.ngOnInit = function () {
        var _this = this;
        //console.log('Data ') ; 
        this._data.getData(this.table).subscribe(function (data) {
            _this.alldata = data; //.map( (_data:any) => {return _data} )  ;
            //console.log(this.alldata) ;
            //console.log('length ', this.alldata.length ) ;
            if (_this.alldata.length > 0) {
                _this.allEdata = JSON.parse(JSON.stringify(data));
                _this.setPage(1);
                console.log('members length ', _this.hymnsData.length);
            }
        });
        //  this._data.getData('groups').subscribe(data => {
        //     this.choirData = data.map( (_data:any) => {return _data} )  ;
        //     //console.log('choir length ', this.choirData.length ) ;
        //  }) ;
        //console.log(this.alldata) ; 
    };
    AppHymns.prototype.initData = function (editFlag, index) {
        this.editFlag = false;
        this.editId = null;
        if (editFlag) {
            this.formDatas = this._bldr.group(this.hymnsData[index]);
            this.editId = this.hymnsData[index]._id;
            this.editFlag = true;
        }
    };
    AppHymns.prototype.addData = function () {
        this.initData(false, undefined);
        this.editFlag = true;
        this.editId = '-1';
        var data = JSON.parse(JSON.stringify(this.emptyData));
        this.hymnsData.unshift(data);
        this.formDatas = this._bldr.group(data);
        console.log('edit id ', this.editId, this.editFlag);
    };
    AppHymns.prototype.editData = function (id, index) {
        this.initData(true, index);
        this.editFlag = true;
    };
    AppHymns.prototype.deleteData = function (id, index) {
        var _this = this;
        this.editFlag = true;
        this.editId = '-1';
        if (id == '-1') {
            this.hymnsData.splice(index, 1);
        }
        else {
            var name_1 = this.hymnsData[index].name;
            if (confirm('Confirm of deleting: ' + name_1 + '?')) {
                this._data.deleteData(this.table, id).subscribe(function (_data) {
                    _this.hymnsData.splice(index, 1);
                    var success = _this._common.deleteIndex(_this.alldata, '_id == "' + id + '"');
                    if (!success) {
                        console.log('Not ablee to delete the Array');
                    }
                    success = _this._common.deleteIndex(_this.allEdata, '_id == "' + id + '"');
                });
            }
        }
        this.cancelData(undefined, undefined);
        if (this.alldata.length > 10) {
            this.setPage(this.pager.curentPage);
        }
    };
    ;
    AppHymns.prototype.saveData = function (id, index) {
        //console.log('Save ', id , index );
        var _this = this;
        var data = this.formDatas.value;
        if (this._common.findDuplicate(this.alldata, 'name.toUpperCase() =="' + data.name.toUpperCase() + '"', id)) {
            alert('The Name exists, please enter unique name');
            return;
        }
        ;
        if (id == '-1') {
            //console.log('insert ', data.fname );
            this._data.addData(this.table, data).subscribe(function (_data) {
                // console.log(_data) ; 
                data._id = _data["_id"].value;
                _this.hymnsData[index] = data;
                _this.alldata.unshift(data);
                if (_this.alldata.length > 10) {
                    _this.setPage(_this.pager.curentPage);
                }
                ;
                _this.allEdata.unshift(data);
            });
        }
        else {
            //console.log('update ', data.fname );
            this._data.editData(this.table, data).subscribe(function (_data) {
                //console.log(_data) ; 
                _this.hymnsData[index] = data;
                var success = _this._common.findUpdate(_this.alldata, '_id=="' + id + '"', data);
                if (!success) {
                    console.log('Not ablee to update the Array');
                }
                success = _this._common.findUpdate(_this.allEdata, '_id=="' + id + '"', data);
            });
        }
        this.cancelData(undefined, undefined);
    };
    AppHymns.prototype.chekChildData = function (id, index) {
    };
    AppHymns.prototype.cancelData = function (id, index) {
        if (id == '-1') {
            this.hymnsData.splice(index, 1);
        }
        this.initData(false, undefined);
    };
    AppHymns.prototype.filterData = function (value) {
        if (value) {
            this.alldata = this.allEdata.filter(function (_data) { return (_data.name.toUpperCase() + _data.author.toUpperCase()).includes(value.toUpperCase()); });
            this.setPage(1);
        }
        else {
            this.alldata = this.allEdata.map(function (_data) { return _data; });
            this.setPage(this.pager.curentPage);
        }
    };
    AppHymns.prototype.goHome = function () {
        this._common.goHome();
    };
    AppHymns.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._common.getPager(this.alldata.length, page);
        this.hymnsData = this.alldata.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    return AppHymns;
}());
AppHymns = __decorate([
    core_1.Component({
        selector: 'APP-HYMNS',
        templateUrl: 'app/views/app.stmark.hymns.html'
    }),
    __metadata("design:paramtypes", [app_common_service_1.AppCommonService, app_data_service_1.AppDataService, forms_1.FormBuilder])
], AppHymns);
exports.AppHymns = AppHymns;
;
//# sourceMappingURL=app.stmark.hymns.js.map