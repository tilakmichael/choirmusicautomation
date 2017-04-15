
import { Injectable }      from '@angular/core';
import { tokenNotExpired ,JwtHelper } from 'angular2-jwt';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

//import  {config} from '../../../config.js' ; 

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('XXXXXXXXXXXXXXXX', 'YYYYYYYYYYY.auth0.com', {});

 

  constructor(public router: Router) {
     this
    .router
    .events
    .filter(event => event instanceof NavigationStart)
    .filter((event: NavigationStart) => (/access_token|id_token|error/).test(event.url))
    .subscribe(() => {
      this.lock.resumeAuth(window.location.hash, (error, authResult) => {
        if (error) return console.log(error);
        localStorage.setItem('id_token', authResult.idToken);
        this.router.navigate(['/']);
      });
     });

      this.lock.on("authenticated", (authResult) => {
          this.lock.getProfile(authResult.idToken, function(error:any , profile:any){
             if (error) {
                throw new Error(error) ; 
             }
             console.log(profile) ;
             let email = profile['email']; 
             if (email.toUpperCase()  == 'DEMOPERSON@HOTMAIL.COM')     {
                profile.demo = 'Y'  ; 
                console.log('Demo') ; 
             }else {
                profile.demo = undefined  ; 
               
             }
             console.log(tokenNotExpired());

             localStorage.setItem('id_token', authResult.idToken);
             localStorage.setItem('profile', JSON.stringify(profile) ) ;              
             console.log(profile) ;
             console.log(authResult.idToken) ;
             console.log(tokenNotExpired());
  
        } ) ; 


      
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    //console.log('in authentication') ;
    //console.log( tokenNotExpired()) ;
    //console.log(localStorage.getItem('id_token')) ; 
     let jwtHelper: JwtHelper = new JwtHelper();
     let token = localStorage.getItem('id_token');
     let retval = false ;
     if (token) {
        if (!jwtHelper.isTokenExpired(token) ) {
           retval = true ;
        }
     }   
    //return tokenNotExpired();
    
    //console.log(localStorage.getItem('id_token')) ; 
    //if (localStorage.getItem('id_token')){
    //  retval = true ; 
   // }
    //console.log( retval ) ; 

    return retval ;
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    //alert('Thank you, please let us know if you have any comments');
  }
}

