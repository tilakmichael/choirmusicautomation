import {Component , OnInit} from '@angular/core' ;
import { FormGroup, FormBuilder } from '@angular/forms';
import {AppDataService } from  '../service/app.data.service';
import {AppCommonService} from '../service/app.common.service';
 

@Component({
   selector:'APP-MEMBERS' ,
   templateUrl: 'app/views/app.stmark.members.html'
})



export class AppMembers implements OnInit{

    public alldata:any     = []  ;
    public allEData:any    =[]   ;
    public choirData:any   = []  ; 
    public error:any   = []  ;
    public memberData:any = []
    public table:string = 'members' ;
    public choir:string  ;  

    public formDatas:FormGroup ; 
    public editFlag:boolean = false ;
    public editId:string = undefined ;
    public emptyData= {"_id":"-1","fname": "","lname": "","email": "", "phone": "", "dob":"", "admin": "",  "active": "true",   "trait": "" , "choir": "","resp":"", "demo":""} ;
    public pager:any = {};
    public searchData:string ;

    constructor(private _common:AppCommonService, private _data:AppDataService, private _bldr:FormBuilder ){} ; 
    ngOnInit() {
          this.choir = this._common.getChoir() ; 
          console.log('choir ' + this.choir) ;

          if (!this.choir) {
              console.log('caalling profile ') ; 
             this._data.setProfile() ;
             this.choir = this._common.getChoir() ;
             console.log('choir ' + this.choir) ;
          }
          
         //console.log('Data ') ; 
         this._data.getData(this.table).subscribe(data => {
            this.alldata = data ; // data.map( (_data:any) => {return _data} )  ;
            //console.log(this.alldata) ;
            //console.log('length ', this.alldata.length ) ;
            if (this.alldata.length > 0){
                this.allEData = JSON.parse( JSON.stringify(data)) ; 
                this.setPage(1) ;
                console.log('members length ', this.memberData.length ) ;
            }    
         }) ;

         this._data.getData('groups').subscribe(data => {
            this.choirData = data ; //data.map( (_data:any) => {return _data} )  ;
            //console.log('choir length ', this.choirData.length ) ;
         }) ;
        
         //console.log(this.alldata) ; 
    }   

private initData(editFlag:Boolean , index:number){
    this.editFlag    = false ;
    this.editId      = null ;
   
    if (editFlag) {
       this.formDatas   = this._bldr.group( this.memberData[index] ) ; 
       this.editId      = this.memberData[index]._id  ; 
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
   this.memberData.unshift(data) ; 
   this.formDatas = this._bldr.group( data ) ;
   
}

public editData(id:string, index:number){
   this.initData(true , index) ; 
   this.editFlag = true ; 
}



public deleteData(id:string, index:number){

  this.editFlag = true ; 
   this.editId   = '-1'  ;
   if (id == '-1') {
      this.memberData.splice(index,1); 
   }else { 
     let name = this.memberData[index].fname +' '+ this.memberData[index].lname ;   
      if ( confirm( 'Confirm of deleting: '+ name +'?') ) {
            this._data.deleteData(this.table, id).subscribe( _data => { 
            this.memberData.splice(index,1); 
            let success = this._common.deleteIndex(this.alldata, '_id == "'+id+'"') ; 
            if (!success) {
               console.log('Not ablee to delete the Array') ; 
            }
            success = this._common.deleteIndex(this.allEData, '_id == "'+id+'"') ;
          }) ;
       }
    }
    this.cancelData(undefined,undefined) ; 
    if (this.alldata.length > 10 ) {
        this.setPage(this.pager.curentPage)
    }

} ;

public saveData(id:string, index:number){
    //console.log('Save ', id , index );
    
   let data =  this.formDatas.value ; 
   if ( this._common.findDuplicate(this.alldata, 'email.toUpperCase() =="'+data.email.toUpperCase()+'"', id) ) {
        alert('The Email exists, please enter unique name')
        return ;
    } ;



   if (id == '-1') {
       //console.log('insert ', data.fname );
       this._data.addData(this.table,data).subscribe( _data => { 
           console.log(_data["_id"]) ; 
           console.log(_data["_id"].value) ; 
   
          data._id = _data["_id"].value ;
          this.memberData[index] = data ;
          this.alldata.unshift(data) ;
          if (this.alldata.length > 10 ) {
            this.setPage(this.pager.curentPage)
          }
          this.allEData.unshift(data) ;

      } 
      )
      
    } else {
      //console.log('update ', data.fname );
      this._data.editData(this.table, data).subscribe( _data => { 
          //console.log(_data) ; 
          this.memberData[index] = data ;
          let success = this._common.findUpdate(this.alldata, '_id=="'+id+'"', data) ;
          if (!success) {
               console.log('Not ablee to update the Array') ; 
            }
           success = this._common.findUpdate(this.allEData, '_id=="'+id+'"', data) ;  
        
         }
      ) ;
    }
    
    this.cancelData(undefined, undefined) ;

}


public cancelData(id:string, index:number){
    if (id  == '-1') {
        this.memberData.splice(index,1) ;
    }   
    this.initData(false , undefined) ; 

}

public filterData(value ){
 
    if (value) {
       this.alldata = this.allEData.filter( (_data:any) => {return ( _data.fname.toUpperCase() +_data.lname.toUpperCase() ).includes( value.toUpperCase() ) } )  ;
       this.setPage(1) ;
 
    } else {
        this.alldata = this.allEData.map( (_data:any) => {return _data} )  ;
        this.setPage(this.pager.curentPage) ;  
 
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
    this.memberData= this.alldata.slice(this.pager.startIndex, this.pager.endIndex+1)
}


} ;