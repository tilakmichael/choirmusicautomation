import {Routes, RouterModule, provideRoutes } from '@angular/router' ;
import {ModuleWithProviders} from '@angular/core' ; 


import {AppGroup} from './app.stmark.groups';
import {AppDefalt} from './app.stmark.defautl';
import { AppMembers} from './app.stmark.members' ; 
import { AppHymns} from './app.stmark.hymns' ; 
import { AppSch} from './app.stmark.schedule' ;
import { AppSchRpt} from './app.stmark.sch.rpt' ;
import { AppAboutMe} from './app.about.me' ; 
 

const routes:Routes=[
    {path:'', component:AppDefalt} ,
    {path:'home', component:AppDefalt} , 
    {path:'group', component:AppGroup} ,
    {path:'member', component:AppMembers},
    {path:'hymns', component:AppHymns} , 
    {path:'sch', component:AppSch} ,
    {path:'schrpt', component:AppSchRpt},
    {path:'aboutme', component:AppAboutMe}
    
  ] ;

export const MenuRoutes: ModuleWithProviders = RouterModule.forRoot(routes) ;
export const MenuComponents = [AppDefalt,AppGroup, AppMembers, AppHymns,AppSch,AppSchRpt,AppAboutMe] ; 

