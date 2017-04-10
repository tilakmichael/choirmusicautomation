import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
//import  {config} from '../../../config.js' ; 

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  public authkey:string = process.env.AUTH_KEY ; 
  public authdomain:string=process.env.AUTH_DOMAIN ;

  lock = new Auth0Lock(this.authkey, this.authdomain, {});

  constructor() {
      // Add callback for lock `authenticated` event
      //console.log('Mongo URL : ' +  config.mongo.url) ;

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
             }
             localStorage.setItem('id_token', authResult.idToken);
             localStorage.setItem('profile', JSON.stringify(profile) ) ;              
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
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    //alert('Thank you, please let us know if you have any comments');
  }
}

