import { AUTH_PROVIDERS } from 'angular2-jwt';
import {NgModule} from  '@angular/core';
import {BrowserModule} from '@angular/platform-browser' ;
import { FormsModule, ReactiveFormsModule } from '@angular/forms' ;
import {HttpModule} from '@angular/http';
import {DatePipe, CurrencyPipe} from '@angular/common' ; 

//import {ModalModule} from 'ng2-bootstrap' ; 
//import { BootstrapModalModule } from 'ng2-bootstrap-modal';

//import {AppCommonService } from './service/app.common.service' ;
//import { AppDataService } from './service/app.data.service' ;  

import {AppComponent} from './app.component' ;
import {MenuRoutes , MenuComponents } from './scripts/app.routers' ; 
import {Auth} from './service/app.auth.service' ;  
import { AuthGuard} from './service/app.auth.guard' ;

import {AppHome} from './scripts/app.stmark.home'
//import { AppAccSlBook} from './scripts/app.acc.slbook' ; 
//import { AppAccBook} from './scripts/app.acc.book' ; 
//import { AppAccSl} from './scripts/app.acc.sl' ; 

//import {AppAccTypeCrud} from './scripts/app.acc.type.crud' ;

@NgModule({
    imports: [BrowserModule,  FormsModule, ReactiveFormsModule, HttpModule,MenuRoutes] , 
    declarations:[AppComponent, MenuComponents, AppHome] ,
    providers: [DatePipe,CurrencyPipe, Auth,AUTH_PROVIDERS, AuthGuard] ,
    //entryComponents: [ AppAccTypeCrud ],
    bootstrap: [AppComponent] 
})

export class AppModule {} ;
