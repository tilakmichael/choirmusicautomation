import { AUTH_PROVIDERS } from 'angular2-jwt';
import {NgModule} from  '@angular/core';
import {BrowserModule} from '@angular/platform-browser' ;
import { FormsModule, ReactiveFormsModule } from '@angular/forms' ;
import {HttpModule} from '@angular/http';
import {DatePipe, CurrencyPipe} from '@angular/common' ; 

import {AppComponent} from './app.component' ;
import {MenuRoutes , MenuComponents } from './scripts/app.routers' ; 
import {Auth} from './service/app.auth.service' ;  
import { AuthGuard} from './service/app.auth.guard' ;

import {AppHome} from './scripts/app.stmark.home'

@NgModule({
    imports: [BrowserModule,  FormsModule, ReactiveFormsModule, HttpModule,MenuRoutes] , 
    declarations:[AppComponent, MenuComponents, AppHome] ,
    providers: [DatePipe,CurrencyPipe, Auth,AUTH_PROVIDERS, AuthGuard] ,
    //entryComponents: [ AppAccTypeCrud ],
    bootstrap: [AppComponent] 
})

export class AppModule {} ;
