import {Component , OnInit} from '@angular/core' ;
import {AppDataService } from  '../service/app.data.service';
import {AppCommonService} from '../service/app.common.service';
import {Auth} from '../service/app.auth.service';
 

@Component({
   selector:'APP-GROUP' ,
   templateUrl: 'app/views/app.stmark.groups.html'
})



export class AppGroup implements OnInit{

    public alldata:any = []  ; 
    public error:any = []  ;
    public groupData:any = []
    public memberData:any = []
    public scheduleData:any = []
  
    public table:string = 'groups' ; 

    public name:string=undefined ; 
    public email:string=undefined ;
    public description:string=undefined ;

    public editFlag:boolean = false ;
    public editId:string = undefined ;
    public emptyData= {"_id":  "-1", "name": "",  "email": "",  "description": ""} ;

    constructor(private _common:AppCommonService, private _data:AppDataService, private _auth:Auth ){} ; 
    ngOnInit() {
         //console.log('Data ') ; 
         this._data.getData(this.table).subscribe(data => {
            this.alldata = data ; // data.map( (_data:any) => {return _data} )  ;
            console.log(this.alldata) ;
            console.log('length ', this.alldata.length ) ;  
         } ) ;

        this._data.getData('members').subscribe(data => {
            this.memberData = data ; //data.map( (_data:any) => {return _data} )  ;
            //console.log(this.memberData) ;
            //console.log('length member ', this.memberData.length ) ;  
         } ) ;

       this._data.getData('schedule').subscribe(data => {
            this.scheduleData = data ; // data.map( (_data:any) => {return _data} )  ;
            //console.log(this.scheduleData) ;
            //console.log('length member ', this.scheduleData.length ) ;  
         } ) ;
     }   ;

private initData(editFlag:Boolean , index:number){
    this.name        = null ; 
    this.email       = null ;
    this.description = null ;
    this.editFlag    = false ;
    this.editId      = null ;
   
    if (editFlag) {
       this.name        = this.alldata[index].name  ; 
       this.email       = this.alldata[index].email ;
       this.description = this.alldata[index].description ;
       this.editId      = this.alldata[index]._id  ; 
       this.editFlag    = true ;

    }
 }

public addData() {
   this.initData(false , undefined) ; 
   this.editFlag = true ; 
   this.editId   = '-1'  ;
   let data =  JSON.parse(JSON.stringify(this.emptyData) ) ;
   this.alldata.push(data) ; 

}

public editData(id:string, index:number){
   this.initData(true , index) ; 
   this.editFlag = true ; 
}


public deleteData(id:string, index:number){

   if (this.chekChildData(id)) {
      alert('Reference Exists of this data, can not be deleted') ; 
      return ;
   }
   
   this.editFlag = true ; 
   this.editId   = '-1'  ;
   if (id == '-1') {
      this.alldata.splice(index,1);
   }else { 
         if ( confirm( 'Confirm of deleting: '+ this.alldata[index].name +'?') ) {
              this._data.deleteData(this.table, id).subscribe( _data => { 
              this.alldata.splice(index,1); 
            }) ;
         }
    }
    this.cancelData(undefined,undefined) ;
} ;


public saveData(id:string, index:number){
    console.log('Save ', id , index );
    
    if ( this._common.findDuplicate(this.alldata, 'name.toUpperCase()=="'+this.name.toUpperCase()+'"', id) ) {
        alert('The Name exists, please enter unique name')
        return ;
    } ;


    let data   = this.alldata[index] ;
      
    //console.log(data); 
    data.name  = this.name ; 
    data.email = this.email ; 
    data.description = this.description ; 
    if (id == '-1') {
       console.log('insert ', data.name );
      this._data.addData(this.table,data).subscribe( _data => { 
          console.log(_data) ; 
          data._id = _data['_id'].value ;
          this.addData[index] = data ;  
      } 
      )
      
    } else {
      console.log('update ', data.name );
      this._data.editData(this.table, data).subscribe( _data => { 
          console.log(_data) ; 
          this.addData[index] = data ; 
         }
      ) ;
    }
    
    this.cancelData(undefined, undefined) ;
};

private chekChildData(id:string){
   let retval = false ; 
   let indx = this._common.findIndex(this.memberData, 'choir=="'+id+'"' )
   if (indx >= 0 ) {
      retval = true ;
   }

   if (!retval) {
      indx = this._common.findIndex(this.scheduleData , 'choir=="'+id+'"' )
      if (indx >= 0 ) {
         retval = true ;
      }
   }
   return retval ;  
};

public cancelData(id:string, index:number){
    if (id  == '-1') {
        this.alldata.splice(index,1) ;
    }   
    this.initData(false , undefined) ; 

};

public goHome(){
  this._common.goHome() ;
};

} ;