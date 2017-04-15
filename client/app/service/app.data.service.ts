import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core' ;
import { Observable } from 'rxjs/Observable' ;
import { AppCommonService} from '../service/app.common.service' ;
import { AuthHttp} from 'angular2-jwt'
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/catch' ;
//import 'rxjs/add/Observable/throw';
 


@Injectable()
export class AppDataService {
    constructor(private http:Http , private _common: AppCommonService, private authhttp:AuthHttp ) {};
    private data:any = []


    public getData(table:string) {
       //console.log('calling rest get for table '+table ) ; 
        //let token  = localStorage.getItem('id_token');
        //console.log(token) ;
        //let headers = new Headers({ 'Authorization': 'Bearer ' + token});
        //let options = new RequestOptions({ headers: headers });

       let url = this.getUrl(table) ; 
       //return this.authhttp.get(url)
       return this.http.get(url)
           .map( (resp:Response) => resp.json() ) 
           .catch( (error:Response )=> {
               console.error(error) ;
               return error.json() ;
               //return Observable.throw(error);
           })  ;  

    } ;  

    public addData(table:string, data:any){
        if (this._common.getdemo() == 'Y') {
           alert('This operation is not allowed for this user!') ;
           return ; 
        }
       //console.log('calling rest for adding table '+table ) ; 
       let url = this.getUrl(table) ; 
       var header = new Headers() ; 
       header.append('content-type', 'application/json') ; 
       //return this.authhttp.post(url, JSON.stringify(data), {headers:header} )
       
       return this.http.post(url, JSON.stringify(data), {headers:header} )
           .map( (resp:Response) => resp.json() ) 
           .catch( (error:Response )=> {
               console.error(error) ;
               return error.json() ;
               //return Observable.throw(error);
           })  ;  
    };

    public editData(table:string, data:any){
        if (this._common.getdemo() == 'Y') {
           alert('This operation is not allowed for this user!') ;
           return ; 
        }
       //console.log('calling rest for updating for table '+table ) ; 
       let url = this.getUrl(table) ; 
       var header = new Headers() ; 
       header.append('content-type', 'application/json') ; 
       //return this.authhttp.put(url, JSON.stringify(data), {headers:header} )
       return this.http.put(url, JSON.stringify(data), {headers:header} )
           .map( (resp:Response) => resp.json() ) 
           .catch( (error:Response )=> {
               console.error(error) ;
               return error.json() ;
               //return Observable.throw(error);
           })  ;  


    };

    public deleteData(table,  id:any){
        if (this._common.getdemo() == 'Y') {
           alert('This operation is not allowed for this user!') ;
           return ; 
        }
       //console.log('calling rest delete for table '+table ) ;
       let url = this.getUrl(table) ;
       url = url+id ; 
       var header = new Headers() ; 
       header.append('content-type', 'application/json') ; 
       //return this.authhttp.delete(url )
       return this.http.delete(url )
           .map( (resp:Response) => resp.json() ) 
           .catch( (error:Response )=> {
               console.error(error) ;
              return error.json() ;
              // return Observable.throw(error);
           })  ;  

    };

  public mailData(id:string){
        if (this._common.getdemo() == 'Y') {
           alert('This operation is not allowed for this user!' ) ;
           console.log(this._common.getdemo()) ;
           return ; 
        }
       console.log('calling mail ' +id ) ; 
       let url = this.getUrl('email') ;
       url = url+id ; 
       console.log('url ' +url ) ; 
       var header = new Headers() ; 
       header.append('content-type', 'application/json') ; 
       return this.authhttp.post(url, null, {headers:header} )
           .map( (resp:Response) => resp.json() ) 
           .catch( (error:Response )=> {
               console.error(error) ;
               //return error.json() ;
               return Observable.throw(error);
           })  ;  
    };


    private getUrl(table) {
       let url = this._common.getUrl() ;
       return url+table+'/' ;
    }


   public setProfile(){
        let retval:boolean = false ;
        let profile        = JSON.parse( localStorage.getItem('profile' ) ) ;
        let email          = profile.email ; 
        let allData:any    = [] ;
        let memberData:any = [] ;

        this.getData('members').subscribe(data => {
            allData = data  ; //.map( (_data:any) => {return _data} )  ;
            memberData = allData.filter( _data => _data.email == email ) ;
            if (memberData.length >= 0) {
                this._common.setChoir(memberData[0].choir) ;
                this._common.setadmin(memberData[0].admin) ;
                this._common.setdemo( (memberData[0].demo ? 'Y': 'N') ) ;
                profile.choir =  memberData[0].choir ; 
                profile.admin =  memberData[0].admin ;
                profile.demo  =  (memberData[0].demo  ? 'Y' : profile.demo) ;
                localStorage.setItem('profile', JSON.stringify(profile) ) ;
                retval = true ; 
            } 
     }) ;
 
  }



}   
   


