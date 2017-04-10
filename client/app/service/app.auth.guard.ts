import { Injectable } from '@angular/core' ;
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate  } from '@angular/router' ;
import {Auth } from './app.auth.service' ; 

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _auth:Auth, private _router:Router){ } ;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
        if ( this._auth.authenticated()) {
           console.log('Authenticated '); 
           return true ; 
        }else {
            console.log('Authenticated not yet');
            this._router.navigate(['/']);
            return false ;
        }
    };
}
