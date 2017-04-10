import {Component , OnInit} from '@angular/core' ;
import { FormGroup, FormBuilder } from '@angular/forms';
import {AppDataService } from  '../service/app.data.service';
import {AppCommonService} from '../service/app.common.service';
 

@Component({
   selector:'APP-HYMNS' ,
   templateUrl: 'app/views/app.stmark.hymns.html'
})



export class AppHymns implements OnInit{

    public alldata:any = []  ;
    public allEdata:any = []  ;

    public choirData   = []  ; 
    public error:any   = []  ;
    public hymnsData:any = []
    public table:string = 'hymns' ; 

    public formDatas:FormGroup ; 
    public editFlag:boolean = false ;
    public editId:string = undefined ;
    public emptyData= {"_id":"-1","name":"","author":"","songsheet":"","song":"","pattern":""} ;
    public pager:any = {};
    public searchData:string ;

    constructor(private _common:AppCommonService, private _data:AppDataService, private _bldr:FormBuilder ){} ; 
    ngOnInit() {
         //console.log('Data ') ; 
         this._data.getData(this.table).subscribe(data => {
            this.alldata = data  ; //.map( (_data:any) => {return _data} )  ;
            
            //console.log(this.alldata) ;
            //console.log('length ', this.alldata.length ) ;
            if (this.alldata.length > 0){
                this.allEdata = JSON.parse( JSON.stringify(data)) ; 
                this.setPage(1) ;
                console.log('members length ', this.hymnsData.length ) ;
            }    
         }) ;

        //  this._data.getData('groups').subscribe(data => {
        //     this.choirData = data.map( (_data:any) => {return _data} )  ;
        //     //console.log('choir length ', this.choirData.length ) ;
        //  }) ;
        
         //console.log(this.alldata) ; 
    }   

private initData(editFlag:Boolean , index:number){
    this.editFlag    = false ;
    this.editId      = null ;
   
    if (editFlag) {
       this.formDatas   = this._bldr.group( this.hymnsData[index] ) ; 
       this.editId      = this.hymnsData[index]._id  ; 
       this.editFlag    = true ;

    }
 }

public addData() {
   this.initData(false , undefined) ; 
   this.editFlag = true ; 
   this.editId   = '-1'  ;
   let data =  JSON.parse(JSON.stringify(this.emptyData) ) ;
   this.hymnsData.unshift(data) ; 
   this.formDatas = this._bldr.group( data ) ;
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
      this.hymnsData.splice(index,1); 
   }else { 
     let name = this.hymnsData[index].name ;   
      if ( confirm( 'Confirm of deleting: '+name+'?') ) {
            this._data.deleteData(this.table, id).subscribe( _data => { 
            this.hymnsData.splice(index,1); 
            let success = this._common.deleteIndex(this.alldata, '_id == "'+id+'"') ; 
            if (!success) {
               console.log('Not ablee to delete the Array') ; 
            }
            success = this._common.deleteIndex(this.allEdata, '_id == "'+id+'"') ;
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
    if (id == '-1') {
       //console.log('insert ', data.fname );
       this._data.addData(this.table,data).subscribe( _data => { 
         // console.log(_data) ; 
          data._id = _data["_id"].value ;
          this.hymnsData[index] = data ;
          this.alldata.unshift(data) ;
          if (this.alldata.length > 10 ) {
            this.setPage(this.pager.curentPage)
          };
          this.allEdata.unshift(data) ;

      } 
      )
      
    } else {
      //console.log('update ', data.fname );
      this._data.editData(this.table, data).subscribe( _data => { 
          //console.log(_data) ; 
          this.hymnsData[index] = data ;
          let success = this._common.findUpdate(this.alldata, '_id=="'+id+'"', data) ;
          if (!success) {
               console.log('Not ablee to update the Array') ; 
            }
           success = this._common.findUpdate(this.allEdata, '_id=="'+id+'"', data) ; 
        
         }
      ) ;
    }
    
    this.cancelData(undefined, undefined) ;

}

private chekChildData(id:string, index:number){

}

public cancelData(id:string, index:number){
    if (id  == '-1') {
        this.hymnsData.splice(index,1) ;
    }   
    this.initData(false , undefined) ; 

}



public filterData(value ){
    if (value) {
       this.alldata = this.allEdata.filter( (_data:any) => {return ( _data.name.toUpperCase() +_data.author.toUpperCase() ).includes( value.toUpperCase() ) } )  ;
       this.setPage(1) ;
 
    } else {
        this.alldata = this.allEdata.map( (_data:any) => {return _data} )  ;
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
    this.hymnsData= this.alldata.slice(this.pager.startIndex, this.pager.endIndex+1)
}


} ;