"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var angular2_jwt_1 = require("angular2-jwt");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
//import {ModalModule} from 'ng2-bootstrap' ; 
//import { BootstrapModalModule } from 'ng2-bootstrap-modal';
//import {AppCommonService } from './service/app.common.service' ;
//import { AppDataService } from './service/app.data.service' ;  
var app_component_1 = require("./app.component");
var app_routers_1 = require("./scripts/app.routers");
var app_auth_service_1 = require("./service/app.auth.service");
var app_auth_guard_1 = require("./service/app.auth.guard");
var app_stmark_home_1 = require("./scripts/app.stmark.home");
//import { AppAccSlBook} from './scripts/app.acc.slbook' ; 
//import { AppAccBook} from './scripts/app.acc.book' ; 
//import { AppAccSl} from './scripts/app.acc.sl' ; 
//import {AppAccTypeCrud} from './scripts/app.acc.type.crud' ;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routers_1.MenuRoutes],
        declarations: [app_component_1.AppComponent, app_routers_1.MenuComponents, app_stmark_home_1.AppHome],
        providers: [common_1.DatePipe, common_1.CurrencyPipe, app_auth_service_1.Auth, angular2_jwt_1.AUTH_PROVIDERS, app_auth_guard_1.AuthGuard],
        //entryComponents: [ AppAccTypeCrud ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
;
//# sourceMappingURL=app.module.js.map