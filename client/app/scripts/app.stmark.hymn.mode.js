"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var AppHymnsMod = (function (_super) {
    __extends(AppHymnsMod, _super);
    function AppHymnsMod(_common, _data, _bldr, dialog) {
        var _this = _super.call(this, dialog) || this;
        _this._common = _common;
        _this._data = _data;
        _this._bldr = _bldr;
        _this.dialog = dialog;
        _this.alldata = [];
        _this.choirData = [];
        _this.error = [];
        _this.hymnsData = [];
        _this.table = 'hymns';
        _this.emptyData = { "_id": "-1", "name": "", "author": "", "songsheet": "", "song": "", "pattern": "" };
        return _this;
    }
    ;
    AppHymnsMod.prototype.ngOnInit = function () {
        var _this = this;
        //console.log('Data ') ; 
        this.addData();
        this._data.getData(this.table).subscribe(function (data) {
            _this.alldata = data; //.map( (_data:any) => {return _data} )  ;
        });
        //  this._data.getData('groups').subscribe(data => {
        //     this.choirData = data.map( (_data:any) => {return _data} )  ;
        //     //console.log('choir length ', this.choirData.length ) ;
        //  }) ;
        //console.log(this.alldata) ; 
    };
    AppHymnsMod.prototype.addData = function () {
        var data = JSON.parse(JSON.stringify(this.emptyData));
        this.formDatas = this._bldr.group(data);
    };
    AppHymnsMod.prototype.saveData = function (id, index) {
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
                _this.message = data._id;
                _this.close();
            });
        }
    };
    AppHymnsMod.prototype.cancelData = function (id, index) {
        this.message = undefined;
        this.close();
    };
    return AppHymnsMod;
}(ng2_bootstrap_modal_1.DialogComponent));
AppHymnsMod = __decorate([
    core_1.Component({
        selector: 'APP-HYMNS',
        templateUrl: 'app/views/app.stmark.hymn.mode.html'
    }),
    __metadata("design:paramtypes", [app_common_service_1.AppCommonService, app_data_service_1.AppDataService, forms_1.FormBuilder, ng2_bootstrap_modal_1.DialogService])
], AppHymnsMod);
exports.AppHymnsMod = AppHymnsMod;
;
//# sourceMappingURL=app.stmark.hymn.mode.js.map