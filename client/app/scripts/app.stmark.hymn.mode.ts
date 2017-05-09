import {Component , OnInit} from '@angular/core' ;
import { FormGroup, FormBuilder } from '@angular/forms';
import {AppDataService } from  '../service/app.data.service';
import {AppCommonService} from '../service/app.common.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface hymnModel {
  title:string;
  message:string;
}
 

@Component({
   selector:'APP-HYMNS' ,
   templateUrl: 'app/views/app.stmark.hymn.mode.html'
})



export class AppHymnsMod extends DialogComponent<hymnModel, string> implements OnInit,hymnModel {
    title:string;
    message:string
    public alldata:any = []  ;
  
    public choirData   = []  ; 
    public error:any   = []  ;
    public hymnsData:any = []
    public table:string = 'hymns' ; 

    public formDatas:FormGroup ; 
    public emptyData= {"_id":"-1","name":"","author":"","songsheet":"","song":"","pattern":""} ;
  
    constructor(private _common:AppCommonService, private _data:AppDataService, private _bldr:FormBuilder, private dialog: DialogService ){
        super(dialog);
    } ; 
    
    ngOnInit() {
         //console.log('Data ') ; 
         this.addData() 
         this._data.getData(this.table).subscribe(data => {
            this.alldata = data  ; //.map( (_data:any) => {return _data} )  ;
         }) ;

        //  this._data.getData('groups').subscribe(data => {
        //     this.choirData = data.map( (_data:any) => {return _data} )  ;
        //     //console.log('choir length ', this.choirData.length ) ;
        //  }) ;
        
         //console.log(this.alldata) ; 
    }   


public addData() {
   let data =  JSON.parse(JSON.stringify(this.emptyData) ) ;
   this.formDatas = this._bldr.group( data ) ;
}




public saveData(id:string, index:number){
    //console.log('Save ', id , index );
    
    let data =  this.formDatas.value ;
    
     if ( this._common.findDuplicate(this.alldata, 'name.toUpperCase() =="'+data.name.toUpperCase()+'"', id) ) {
        alert('The Name exists, please enter unique name')
        return ;
     } ;


    if (id == '-1') {
       //console.log('insert ', data.fname );
       this._data.addData(this.table,data).subscribe( _data => { 
         // console.log(_data) ; 
          data._id = _data["_id"].value ;
          this.message = data._id ;
          this.close() ;
      } 
      )
      
    } 
    

}


public cancelData(id:string, index:number){
          this.message = undefined ;
          this.close() ;
 
}



} ;