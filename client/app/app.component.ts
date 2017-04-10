import { Component } from '@angular/core';
import { AppCommonService} from './service/app.common.service' ; ; 
import {AppDataService} from './service/app.data.service' ;   
 



@Component({
  selector: 'my-app',
  template: `<div class='container'> 
                 <div>
                    <APP-HOME> </APP-HOME>
                 </div>   
             </div>
             ` , 
  providers: [AppCommonService, AppDataService]
})
export class AppComponent { 
 };