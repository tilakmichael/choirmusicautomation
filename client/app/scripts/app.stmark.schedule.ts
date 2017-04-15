import {Component , OnInit} from '@angular/core' ;
import { FormGroup, FormBuilder } from '@angular/forms';
import {AppDataService } from  '../service/app.data.service';
import {AppCommonService} from '../service/app.common.service';
 

@Component({
   selector:'APP-SCH' ,
   templateUrl: 'app/views/app.stmark.sch.html'
})



export class AppSch implements OnInit{

    public alldata:any = []  ;
    public allEdata:any = []  ;

    public schData   = []  ; 
    public error:any   = []  ;
    public hymnsData:any = [] ;
    public gropData:any  = [] ;
    public table:string = 'schedule' ; 

    public formDatas:FormGroup ; 
    public editFlag:boolean = false ;
    public editId:string = undefined ;
    public emptyData= {"_id":"-1","date":"","name":"","enterance":"","offertory":"","communion":"","sending":"","name1":"","song1":"","name2":"","song2":"","name3":"","song3":"","responsorial":"","mailed":false,"mailedt":"","choir":""} ;
    public pager:any = {};
    public searchName:string ;
    public searchDate:string ;
    public choir:string ;

    constructor(private _common:AppCommonService, private _data:AppDataService, private _bldr:FormBuilder ){} ; 
    ngOnInit() {
         this.choir = this._common.getChoir() ;
         console.log('choir ' + this.choir) ;
          if (!this.choir) {
              console.log('calling profile ') ; 
             this._data.setProfile() ;
             this.choir = this._common.getChoir() ;
             console.log('choir ' + this.choir) ;
          }
 
         //console.log('Data ') ; 
         this._data.getData(this.table).subscribe(data => {
         this.alldata = data ;            
         //this.alldata.push(data) ; // = data.map( (_data:any) => {return _data} )  ;
         this.allEdata = data ;
         //data.map( (_data:any) => {return _data} )  ;
         //console.log(this.alldata) ;
         //console.log('length ', this.alldata.length ) ;
         if (this.alldata.length > 0){
             this.allEdata = JSON.parse( JSON.stringify(data) );
             this.setPage(1) ;
             console.log('data length ', this.alldata.length ) ;
          } 

            this._data.getData('hymns').subscribe(data => {
            this.hymnsData = data 
            //data.map( (_data:any) => {return _data} )  ;
            console.log('hymn length ', this.hymnsData.length ) ;
    

                this._data.getData('groups').subscribe(data => {
                this.gropData = data 
                //data.map( (_data:any) => {return _data} )  ;
                console.log('hymn length ', this.hymnsData.length ) ;
        
                }) ;



            }) ;



 


         }) ;

 
     }   

private initData(editFlag:Boolean , index:number){
    this.editFlag    = false ;
    this.editId      = null ;
   
    if (editFlag) {
       //let data =   this._bldr.group( this.schData[index] ) ;
        let data =    this.schData[index]  ;
        data['mailed']  = false ;
       this.formDatas   = this._bldr.group( data ) ; 
       this.editId      = this.schData[index]._id  ; 
       this.editFlag    = true ;

    }
 }

public addData() {
   this.initData(false , undefined) ; 
   this.editFlag = true ; 
   this.editId   = '-1'  ;
   let data =  JSON.parse(JSON.stringify(this.emptyData) ) ;
   if (this.choir) {
      data.choir = this.choir ;
   }   
   this.schData.unshift(data) ; 
   this.formDatas   = this._bldr.group( data ) ;
   console.log('edit id ' , this.editId, this.editFlag) ; 
}

public editData(id:string, index:number){
   this.initData(true , index) ; 
   this.editFlag = true ; 
}


public deleteData(id:string, index:number){
   this.editFlag = true ; 
   this.editId   = '-1'  ;
   if (id == '-1') {
      this.schData.splice(index,1); 
   }else { 
     let name = this.schData[index].name ;   
      if ( confirm( 'Confirm of deleting: '+name+'?') ) {
            this._data.deleteData(this.table, id).subscribe( _data => { 
            this.schData.splice(index,1); 
            let success = this._common.deleteIndex(this.addData, '_id == "'+id+'"') ; 
            if (!success) {
               console.log('Not ablee to delete the Array') ; 
            }
          }) ;
       }
    }
    this.cancelData(undefined,undefined) ; 
    if (this.alldata.length > 10 ) {
        this.setPage(this.pager.curentPage)
    }

} ;

public saveData(id:string, index:number){
    console.log('Save ', id , index );
    
    let data =  this.formDatas.value ; 
    if (id == '-1') {
       //console.log('insert ', data.fname );
       this._data.addData(this.table,data).subscribe( _data => { 
         // console.log(_data) ; 
          data._id = _data['_id'].value ;
          this.schData[index] = data ;
          this.alldata.unshift(data) ;
          if (this.alldata.length > 10 ) {
            this.setPage(this.pager.curentPage)
          }

      } 
      )
      
    } else {
      //console.log('update ', data.fname );
      
      this._data.editData(this.table, data).subscribe( _data => { 
          console.log(_data) ; 
          this.schData[index] = data ;
          let success = this._common.findUpdate(this.alldata, '_id=="'+id+'"', data) ;
          if (!success) {
               console.log('Not ablee to update the Array') ; 
            }
        
         }
      ) ;
    }
    
    this.cancelData(undefined, undefined) ;

}

private chekChildData(id:string, index:number){

}

public cancelData(id:string, index:number){
    if (id  == '-1') {
        this.schData.splice(index,1) ;
    }   
    this.initData(false , undefined) ; 

}



public filterData(value ){
    if (value) {
       this.alldata = this.allEdata.filter( (_data:any) => {return ( _data.name.toUpperCase()  ).includes( value.toUpperCase() ) } )  ;
       this.setPage(1) ;
 
    } else {
        if (this.searchDate) {
          this.filterDate(this.searchDate);
        }else {
        this.alldata = this.allEdata.map( (_data:any) => {return _data} )  ;
        this.setPage(this.pager.curentPage) ;  
        }
    }

}

public filterDate(value ){
    if (value) {
       this.alldata = this.allEdata.filter( (_data:any) => {return  _data.date  == value } )  ;
       this.setPage(1) ;
 
    } else {
        if (this.searchName) {
          this.filterData(this.searchName);
        }else {
          this.alldata = this.allEdata.map( (_data:any) => {return _data} )  ;
          this.setPage(this.pager.curentPage) ;
        }   
 
    }

}

public mailData(id:string, index:number) {
  let sucees:boolean = false ;
  let data =  this.schData[index] ;  
  this._data.mailData(id).subscribe( _data => { 
      console.log(_data) ;
      sucees = _data['success'] ;  
      console.log('sucess ' + sucees) ;
      if (sucees) {
        
        data['mailed'] = true ;  
        this.formDatas = this._bldr.group( data ) ; ; 
        this.saveData(id, index) ;
      }

  }  );
 
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