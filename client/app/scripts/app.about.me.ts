import {Component , OnInit} from '@angular/core' ;
import { FormGroup, FormBuilder } from '@angular/forms';
import {AppCommonService} from '../service/app.common.service';
 

@Component({
   selector:'APP-ME' ,
   templateUrl: 'app/views/app.stmark.about.me.html'
})



export class AppAboutMe implements OnInit{
 public profile:any ;
 public profileObj = {} ;
 public fullName:string ; 
 public alias:string    ;
 public email:string    ;
 public gender:string   ; 
 public pict:string     ;
 public choir:string    ;
 public dob:Date        ;
 public demo:string     ; 


 constructor(private _common:AppCommonService ){} ;
 public ngOnInit(){
     this.profile   = localStorage.getItem('profile' ) ;
     //console.log(this.profile);

     if (this.profile) {
         this.profileObj= JSON.parse(this.profile)          ;
         //console.log('in') ;
         //console.log(this.profileObj) ;    
         this.fullName  = this.profileObj['name']    ;
         this.alias     = this.profileObj['nickname'] ;
         this.gender    = this.profileObj['gender']   ;
         this.pict      = this.profileObj['picture'] ;
         this.email     = this.profileObj['email'] ;
         this.demo      = this.profileObj['demo'] ;
         this.choir     = this.profileObj['choir'] ;
         //this.dob       = this.profileObj['dob'] ;
         //console.log('name:' , this.fullName) ;   
     }            
 }

 
 public goHome(){
  this._common.goHome() ;
};

}    

