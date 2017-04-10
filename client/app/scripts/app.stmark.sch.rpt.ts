import {Component , OnInit} from '@angular/core' ;
import { FormGroup, FormBuilder } from '@angular/forms';
import {AppDataService } from  '../service/app.data.service';
import {AppCommonService} from '../service/app.common.service';
 

@Component({
   selector:'APP-SCH-REP' ,
   templateUrl: 'app/views/app.stmark.sch.rpt.html'
})



export class AppSchRpt implements OnInit{

    public alldata:any = []  ;
    public allEdata:any = []  ;

    public schData:any    = []  ; 
    public error:any   = []  ;
    public hymnsData:any = [] ;
    public table:string = 'schedule' ; 
 
    public editFlag:boolean = false ;
    public editId:string = undefined ;
    public fromDate:any ;
    public endDate:any ;
    public pager:any = {};
    public today:Date = new Date() ; 
    public day:number = this.today.getDay() ;


    public date:Date ; 
    public name:string ; 
    public enterance:string ; 
    public enteranceLnk:string ;
    public offertory:string
    public offertoryLnk:string 
    public communion:string
    public communionLnk:string 
    public sending:string
    public sendingLnk:string 
    public name1:string ; 
    public song1:string ; 
    public name2:string ;
    public song2:string ; 
    public index:number  ;
    public maxNo:number ; 
    public song1Lnk:string ; 
    public song2Lnk:string
     





    constructor(private _common:AppCommonService, private _data:AppDataService, private _bldr:FormBuilder ){} ; 
    ngOnInit() {
         //console.log('init Data ') ; 
         this._data.getData('hymns').subscribe(data => {
           this.hymnsData = data ; // data.map( (_data:any) => {return _data} )  ;
           //console.log('hymn length ', this.hymnsData.length ) ;
         }) ;
    
         this._data.getData(this.table).subscribe(data => {
           //this.alldata =  data ; // data.map( (_data:any) => {return _data} )  ;
           this.allEdata = data ; // data.map( (n_data:any) => {return _data} )  ;
           //console.log(this.alldata) ;
           //console.log('length ', this.allEdata.length ) ;
           if (this.allEdata.length > 0){
              this.fromDate = this._common.addDate( this.today, this.day*-1) ;
              this.endDate  = this._common.addDate( this.today, 30 ) ; 
              this.alldata = this.allEdata.filter(data => data.date >= this.fromDate &&  data.date <= this.endDate ) ; 
              //console.log('data length ', this.alldata.length ) ;
      
              //console.log('data2 length ', this.allEdata.length ) ;
              //this.alldata  = this.allEdata ;
              this.initTable() ;
              }    
           }) ;

     }   

public initData(idx:number){
    //console.log('inittable ' + idx + ' / ' + this.schData.length ) ;
    this.date      = this.schData[idx].date ; 
    this.name      = this.schData[idx].name ; 
    this.enterance = this.schData[idx].enterance;
    this.enteranceLnk =  this.schData[idx].enteranceLnk;
    this.offertory = this.schData[idx].offertory ; 
    this.communion = this.schData[idx].communion ; 
    this.sending   = this.schData[idx].sending ; 
    this.name1     = this.schData[idx].name1 ; 
    this.song1     = this.schData[idx].song1 ; 
    this.name2     = this.schData[idx].name2 ;
    this.song2     = this.schData[idx].song2 ; 
    this.offertoryLnk = this.schData[idx].offertoryLnk ; 
    this.communionLnk = this.schData[idx].communionLnk ; 
    this.sendingLnk   = this.schData[idx].sendingLnk ; 
    if (this.song1) {
       this.song1Lnk     = this.schData[idx].song1Lnk ; 
    }
    if (this.song1) {
      this.song2Lnk     = this.schData[idx].song2Lnk ;
    } 
}

public initTable(){
   
   this.maxNo  = this.alldata.length-1 ;  
   //console.log('inittable ' + this.maxNo + ' / ' + this.alldata.length ) ;
   if (this.alldata.length == 0 ) {
       return ;
   }
   this.schData = [] ;
   for (let i=0 ; i<= this.maxNo ; i++ ) {
         let data = this.alldata[i] ;
         let _data = this.alldata[i] ; 
         let indx = this._common.findIndex(this.hymnsData, '_id=="'+_data.enterance+'"') ; 
         if (indx >= 0) {
             data.enterance   = this.hymnsData[indx].name ;
             data.enteranceLnk= this.hymnsData[indx].songsheet ; 
         }
         indx = this._common.findIndex(this.hymnsData, '_id=="'+_data.offertory+'"') ; 
         if (indx >= 0) {
             data.offertory    = this.hymnsData[indx].name ;
             data.offertoryLnk = this.hymnsData[indx].songsheet ; 
         }

         indx = this._common.findIndex(this.hymnsData, '_id=="'+_data.communion+'"') ; 
         if (indx >= 0) {
             data.communion    = this.hymnsData[indx].name ;
             data.communionLnk = this.hymnsData[indx].songsheet ; 
         }

         indx = this._common.findIndex(this.hymnsData, '_id=="'+_data.sending+'"') ; 
         if (indx >= 0) {
             data.sending    = this.hymnsData[indx].name ; 
             data.sendingLnk = this.hymnsData[indx].songsheet ; 
         }

         if (data.song1) {
            indx = this._common.findIndex(this.hymnsData, '_id=="'+_data.song1+'"') ; 
            if (indx >= 0) {
               data.song1    = this.hymnsData[indx].name ; 
               data.song1Lnk = this.hymnsData[indx].songsheet ; 
            }
         }
         if (data.song2) {
            indx = this._common.findIndex(this.hymnsData, '_id=="'+_data.song2+'"') ; 
            if (indx >= 0) {
               data.song2    = this.hymnsData[indx].name ; 
               data.song2Lnk = this.hymnsData[indx].songsheet ; 
            }
         }



         //console.log('inittable '   + this.schData.length ) ;
 
         this.schData.push( data) ;
   }
   ;
   //console.log('exit inittable ' + this.schData.length ) ;

   this.initData(0) ;
   this.index = 0 ;

}

public nextDoc() {
    //alert('next  ' +this.index + ' '+ this.maxNo + '/'+this.schData.length) ;
    if (this.index < this.maxNo) {
        this.index = this.index +1 ; 
        this.initData(this.index) ;
    }
}

public prevDoc(){
      //alert('prev ' + this.index + ' '+ this.maxNo +' /'+this.schData.length) ;
      if (this.index > 0) {
        this.index = this.index -1 ; 
        this.initData(this.index) ;
    } 
}


public filterFromDate(value:Date ){
    if (value) {
       this.alldata = this.alldata.filter( (_data:any) => {return ( _data.date >= value ) } )  ;
       this.initTable() ;
 
    } else {
        if (this.endDate) {
          this.filterEndDate(this.endDate);
        }else {
          this.alldata = this.allEdata.map( (_data:any) => {return _data} )  ;
          this.initTable() ;
        }
    }

}

public filterEndDate(value ){
    //alert(value) ;

    if (value) {
       this.alldata = this.alldata.filter( (_data:any) => {return  _data.date  <= value } )  ;
       this.initTable() ;
 
    } else {
       if (this.endDate) {
          this.filterFromDate(this.fromDate);
        }else {
          this.alldata = this.allEdata.map( (_data:any) => {return _data} )  ;
          this.initTable() ;
        }
     }
}

public goHome(){
  this._common.goHome() ;
}

setPage(page:number){
    if ( page < 1 || page > this.pager.totalPages){
        return ;
    }
    this.pager = this._common.getPager(this.alldata.length, page);
    this.schData= this.alldata.slice(this.pager.startIndex, this.pager.endIndex+1)
}


} ;