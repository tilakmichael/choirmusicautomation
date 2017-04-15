import { Router } from '@angular/router';
import { Injectable } from '@angular/core' ;
import { Observable } from 'rxjs/Observable' ;
import { DatePipe} from '@angular/common' ;

@Injectable()
export class AppCommonService {
   //public url:string = "http://localhost:3000/api/acc/v1/";
   private url:string = "/api/stm/mlab/";
   private groupName:string ;
   private userMail:string ; 
   private admin:string ; 
   private choirMaster:string ; 
   private choir:string   ; 
   private demo:string 

   private doc = {} ;  

 
   constructor(private _date:DatePipe, private _router:Router) {}

   range(start:number, count:number){
       return Array.apply(0, Array(count))
          .map( function (element:any, index:number){
              return (index+start) ;
       });
   }






  public goHome() {
      this._router.navigateByUrl('home') ;
  }

  public sqlDt2Jdt(date:Date) {

      if (date == null || date==undefined || !date) {
          return ;
      }
      let jsDate  = this._date.transform(date, 'yyyy-MM-dd');
      //console.log(jsDate) ;
      return jsDate ;

  }


   public getPager(totalItems:number, currentPage:number=1, pageSize:number=10 ){
        let totalPages = Math.ceil(totalItems/ pageSize) ;
        let startPage:number, endPage:number ;
        if (totalPages <= 10){
           startPage = 1 ;
           endPage   = totalPages ;
        }else {
           if (currentPage <= 6){
               startPage = 1 ;
               endPage = 6 ;
           }else if (currentPage+4 >= totalPages){
               startPage = totalPages-9 ;
               endPage = 10 ;

           }else {
               startPage = currentPage-5 ;
               endPage = currentPage+4 ;
           }
        }
        let startIndex = (currentPage-1)* pageSize ;
        let endIndex   = Math.min(startIndex+pageSize-1, totalItems-1) ;
        let pages = this.range(startPage,endPage) ;

        return {
            totalItems:totalItems ,
            currentPage:currentPage,
            totalPages:totalPages ,
            startPage:startPage ,
            endPage:endPage ,
            startIndex: startIndex,
            endIndex: endIndex ,
            pages:pages
        }
   }


 public findIndex(doc:any, filter:string ){
   //console.log('filter : ' +  filter) ;
   filter = '_doc.'+filter.trim() ;
   //console.log(filter) ;

   let index = doc.findIndex( (_doc:any) =>   eval(filter) ) ;
   //console.log( 'fndindex' + index) ;
   return index ;
 }

 public deleteIndex(doc:any, filter:string ){
   let indx = this.findIndex(doc, filter) ; 
   let retval:boolean = false ; 
   if (indx >= 0 ) {
       doc.splice(indx,1) ;
       retval = true ;
       //console.log( 'Deleted ' + indx) ;
   }  
   return retval ;
 }


public findUpdate(doc:any, filter:string, data:any ){
   let indx = this.findIndex(doc, filter) ; 
   let retval:boolean = false ; 
   if (indx >= 0 ) {
       doc[indx] = data ;
       retval = true ;
       //console.log( 'updated ' + indx) ;
   }  
   return retval ;
 }

public findDuplicate(doc:any, filter:string, id:string ){
   let indx = this.findIndex(doc, filter) ; 
   let retval:boolean = false ; 
   if (indx >= 0 ) {

      if (doc[indx]._id != id ) {
          console.log(doc[indx]._id, id);
          retval = true ;
      }
   }  
   return retval ;
 }


 public addDate(date:Date, day:number) {
     //console.log('in date', date);
     let dt = date ; 
     dt.setDate(dt.getDate() + day);
     //console.log('ret date', date);
     return this.sqlDt2Jdt(date) ;
 }


  public getUrl() {
       return this.url ;
  } ;



  public getgroupName(){
      return this.groupName ;
  } ;
  public getuserMail(){
    return this.userMail ;
  };     
  public getadmin(){
    return this.admin ;    
  } ;

  public getdemo(){
     if (!this.demo){
         let profile        = JSON.parse( localStorage.getItem('profile' ) ) ;
         this.demo = 'N';
         if (profile.demo) {
            this.demo = (profile.demo == 'Y' ? 'Y':'N') ;
          }   
     }
    return this.demo ;    
  } ;


  public getchoirMaster(){
     return this.choirMaster ; 
  } ;  

public setgroupName(name:string){
      this.groupName = name ;
  } ;
  public setuserMail(mail:string){
     this.userMail = mail ;
  };     
  public setadmin( admin:string){
      this.admin = admin ;    
  } ;
    
  public setdemo( demo:string){
      this.demo = demo ;    
  } ;

  public setchoirMaster(flag:string){
      this.choirMaster = flag ; 
  } ;

  public getProfileImage() {
        let immage:string ;
        let profile   = JSON.parse(localStorage.getItem('profile' ) ) ;
        if (profile) {
           immage  = profile['picture'] ;
 
        }
        return immage ;
  }  

  public getChoir() {
      return this.choir ;
  }

  public setChoir(choir:string) {
    this.choir = choir;
  }
   
}