
import {Component, OnInit} from '@angular/core' ;
import {Router} from '@angular/router';
import {MenuRoutes} from './app.routers';
import {Auth} from '../service/app.auth.service' ;
import {AppCommonService} from '../service/app.common.service' ;
import { AppDataService} from '../service/app.data.service'

@Component({
  selector:'APP-HOME' , 
  templateUrl: 'app/views/app.stmark.home.html'
})

  
export class AppHome implements OnInit{
    public groupName:string = '1130 Choir' ;
    public profile:string ;
    public name:string ; 
    public pict:string ;

    constructor( private _auth:Auth, private _router:Router, private _common:AppCommonService, private _data:AppDataService ){}

    ngOnInit(){

        this.profile   = JSON.parse(localStorage.getItem('profile' ) ) ;
        if (this.profile) {
           this.name  = this.profile['name']    ;
           this.pict  = this.profile['picture'] ;

           let choir = this._common.getChoir() ;
           if (!choir) {
              if ( this._auth.authenticated() ) {
                  //console.log('authenticated for profile') 
                 //this._data.setProfile() ;
              }   else {
                 //console.log('not authenticated') 
              }
           }else {
               this.groupName = choir ; 
           }
 
        }
    }

}    