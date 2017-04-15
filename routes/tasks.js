var express = require('express') ; 
var jwt     = require('express-jwt');
var router = express.Router() ;
var mongojs = require('mongojs');
var sysconfig = require('../config.js')

var conString = process.env.PROD_MONGODB|| sysconfig.mongo.url ;
var db    = mongojs(conString ,['groups','members', 'hymns','schedule']) ;
var apik  = sysconfig.mailgun.key ;
var apid  = sysconfig.mailgun.domain ;    
var schedule = require('node-schedule');  



var jwtCheck = jwt({
  secret:  sysconfig.auth0.secret , 
  audience: sysconfig.auth0.client  
});

// core job on sunday, 5 clock , 0 mnt , 0 sec 

var j = schedule.scheduleJob('0 0 5 * * 0', function(){
  //var date = new Date() ;   
  console.log('crone job tesitng !' );
  //scheduleMail() ;

});

function sqlDt2Jdt(date) {

   var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function findScdule(today){
  console.log('entering find schedule') ; 
   var id ;  
   db.schedule.findOne({date: today} , function(err, data) {
       if (err){
          id = null ; 
       }else {
        id = data._id  ; 
        console.log('find sachedule ' + id) ; 
        processMail(id) ;  
        data.mailed = true ; 
         db.schedule.update( {_id: mongojs.ObjectId(id)} ,  data, {} , function(err, data) {
         if (err){
            
         }else {
               
         }
    } );       
       }
    } );

}

// schedule mail 
function scheduleMail() {
    var date = new Date() ;
    var day  = date.getDay() ; 
    console.log('Day ' + day) ;
    if (day !== 0) {
       date.setDate(date.getDate() + (7-day)); 
       //console.log('next sunday ' + date) ;
   }
   date = sqlDt2Jdt(date) ; 
   console.log('formated  ' + date) ;
   findScdule(date) ;
    
}


// process mail
function processMail(id) {
   //find schedule 
   
   //console.log('testing mail') ;
   //console.log('env varable auth' + apik); 
   //console.log('env varable myname' + apid); 

   var mailgun = require('mailgun-js')({apiKey: apik , domain: apid});
   var schData     ;
   var memData     ;
   var hymnData    ;
   var mailMsg     ;
   var mailTo      ;
   var MailFrom    ;
   var mailhdr     ;
   var choirGroup  ;

   

/*
           var mailcomposer = require('mailcomposer');
            
            var mail = mailcomposer({
                    from: 'you@samples.mailgun.org',
                    to: 'mm@samples.mailgun.org',
                    subject: 'Test email subject',
                    text: 'Test email text',
                    html: '<b> Test email text </b>'
            });
            
            mail.build(function(mailBuildError, message) {
            
                var dataToSend = {
                    to: 'mm@samples.mailgun.org',
                    message: message.toString('ascii')
                };
            
                mailgun.messages().sendMime(dataToSend, function (sendError, body) {
                    if (sendError) {
                        console.log(sendError);
                        return;
                    }
                });
            });

*/
//    var data = {
//       from: 'St Mark Choir <stmark1130choir@gmail.com>',
//       to: 'tilakmichael@gmail.com',
//       subject: 'Hello',
//        text: 'Testing some Mailgun awesomness!'   
//    };
 
//    mailgun.messages().send(data, function (error, body) {
//        console.log(body);
//    });

     //console.log('processing mail') ;
     
     db.schedule.findOne({_id: mongojs.ObjectId(id)} , function(err, data) {
       if (err){
          schData = null ;
       }else {
          //console.log('schedule data') ;  
          //console.log(data) ;       
          schData = data;
          mailhdr = schData.date + ' '+schData.name ;
          //console.log(schData) ;
          db.members.find( function(err, data2) {
             if (err){
                 
             }else {
                 //console.log(schData.choir);
                 memData = data2.filter( _data2 => _data2.choir == schData.choir ) ;
                 mailTo  = memData.map( function(obj){
                     return obj.email ;
                 }).join(', ');
                 // console.log(' mail to :' + mailTo);    
                 // get songs 
                 db.hymns.find( function(err, data3) {
                 if (err){
                 }else {
                        //hymnData = data3.filter( _data3 => _data3.choir == schData.choir ) ;
                        //hymnData = data3 ;
                        //console.log(data3);
                        if (schData.enterance) {
                                hymnData = data3.filter( _data4 => _data4._id == schData.enterance ) ;
                                //console.log(hymnData);
                                //console.log('hymn ss ' + hymnData[0].songsheet);
                                
                                if (hymnData[0].songsheet) {
                                   mailMsg = '<br/><br/><br/> '+ 'Enterance  : ' + '<a href="'+ hymnData[0].songsheet +  '">' + hymnData[0].name +'</a>' +' <br/><br/>'; 
                                } else {
                                   mailMsg = 'Enterance  : ' +   hymnData[0].name +'n/' ;
                                }

                        }

                       if (schData.offertory) {
                                hymnData = data3.filter( _data4 => _data4._id == schData.offertory ) ;
                               // console.log(hymnData);
                               // console.log('hymn ss ' + hymnData[0].songsheet);
                                
                                if (hymnData[0].songsheet) {
                                   mailMsg = mailMsg +'Offertory  : ' + '<a href="'+ hymnData[0].songsheet +  '">' + hymnData[0].name +'</a>'  +' <br/><br/>';
                                } else {
                                   mailMsg = mailMsg+'Offertory  : ' +   hymnData[0].name  ;
                                }
                        }

                       if (schData.communion) {
                                hymnData = data3.filter( _data4 => _data4._id == schData.communion ) ;
                                //console.log(hymnData);
                                //console.log('hymn ss ' + hymnData[0].songsheet);
                                
                                if (hymnData[0].songsheet) {
                                   mailMsg = mailMsg +'Communion  : ' + '<a href="'+ hymnData[0].songsheet +  '">' + hymnData[0].name +'</a>' +' <br/><br/>' ; 
                                } else {
                                   mailMsg = mailMsg+'Communion  : ' +   hymnData[0].name  ;
                                }
                        }
                       if (schData.sending) {
                                hymnData = data3.filter( _data4 => _data4._id == schData.sending ) ;
                                //console.log(hymnData);
                                //console.log('hymn ss ' + hymnData[0].songsheet);
                                
                                if (hymnData[0].songsheet) {
                                   mailMsg = mailMsg +'Sending Forth : ' + '<a href="'+ hymnData[0].songsheet +  '">' + hymnData[0].name +'</a>' +'<br/> <br/>';  
                                } else {
                                   mailMsg = mailMsg+'Sending Forth : ' +   hymnData[0].name  ;
                                }
                        }
                       if (schData.song1) {
                                hymnData = data3.filter( _data5 => _data5._id == schData.song1 ) ;
                                //console.log(hymnData);
                                //console.log('hymn ss ' + hymnData[0].songsheet);
                                
                                if (hymnData[0].songsheet) {
                                   mailMsg = mailMsg + schData.name1 +' : ' + '<a href="'+ hymnData[0].songsheet +  '">' + hymnData[0].name +'</a>' +' <br/><br/>';  
                                } else {
                                   mailMsg = mailMsg+schData.name1 +' : '+   hymnData[0].name  ;
                                }
                        }

                       if (schData.song2) {
                                hymnData = data3.filter( _data6 => _data6._id == schData.song2 ) ;
                                //console.log(hymnData);
                                //console.log('hymn ss ' + hymnData[0].songsheet);
                                
                                if (hymnData[0].songsheet) {
                                   mailMsg = mailMsg + schData.name2 +' : ' + '<a href="'+ hymnData[0].songsheet +  '">' + hymnData[0].name +'</a>' +' <br/><br/>';  
                                } else {
                                   mailMsg = mailMsg+schData.name2 +' : '+   hymnData[0].name  ;
                                }
                        }

                        if (schData.responsorial) {
                            mailMsg = mailMsg + 'Responsorial : ' + '<a href="'+ schData.responsorial +  '">' + schData.name +'</a>' +'<br/><br/><br/> <br/><br/>';  
                         }
                         mailMsg = mailMsg + '<p> Plese note that this mail is generated from an automated system and it is still in testing mode  </p>' ; 
                         

                       mailTo ='tilakmichael@gmail.com, tilakmichael@hotmail.com';
                        // mail data
                        var data = {
                           from: 'St Mark Choir <stmark1130choir@gmail.com>',
                           to: mailTo,
                           subject: mailhdr ,
                           //text: mailMsg  
                           html: '<html>' + mailMsg +'</html>'   
                        };
                        
                        //console.log(data);
                        mailgun.messages().send(data, function (error, body) {
                            if (error) {
                                console.log('Mail error ');
                                console.log(error) ; 
                            }else {
                                console.log(body);
                            }
                           
                        });

                    }
                   } ) ; 
                 }
           } ) ; 
             
       }
    } );

    if (schData != null ) {
       choirGroup = schData['choir'] ; 
       console.log(choirGroup) ;
    }
  
     
}


// get all data of from a table

function findDatas(req , resp , next, dbtable, sort){
    //console.log( 'rest for getting ' ) ;

    //console.log( localStorage.getItem('id_token') ); 
    if (sort){
       dbtable.find().sort(sort, function(err, data) {
        if (err){
            resp.send(err) ;
        }else {
            resp.json(data);   
        }
        } ); ;
 
    }else {

        dbtable.find( function(err, data) {
        if (err){
            resp.send(err) ;
        }else {
            resp.json(data);   
        }
        } );
    }     

   
} ;

// find a doc by id from a table
function findOne(req , resp , next, dbtable){
    dbtable.findOne({_id: mongojs.ObjectId(req.params.id)} , function(err, data) {
       if (err){
          resp.send(err) ;
       }else {
          resp.json(data);   
       }
    } );
};

function addData(req , resp , next, dbtable, doc) {
     dbtable.save(doc, function(err, data) {
         if (err){
            resp.send(err) ;
         }else {
            resp.json(data);   
         }
    } );
};


function updateData(req , resp , next, dbtable, doc,id) {
     //consle.log('updating data in updateData') ; 
     
     //console.log('update : '+id);
     dbtable.update( {_id: mongojs.ObjectId(id)} ,  doc, {} , function(err, data) {
         if (err){
            resp.send(err) ;
         }else {
            resp.json(data);   
         }
    } );
};



function deleteData(req , resp , next, dbtable) {
    dbtable.remove( {_id: mongojs.ObjectId(req.params.id)}  , function(err, data) {
         if (err){
            resp.send(err) ;
         }else {
            resp.json(data);   
         }
    } 
    );
};

// **********  Groups ***********************
// get all data from groups
//router.get('/stm/mlab/groups', jwtCheck);
//router.get('/stm/mlab/groups',jwtCheck, function(req,resp, next){
router.get('/stm/mlab/groups', function(req,resp, next){

      findDatas(req,resp, next, db.groups);
} ) ;
// get one row from groups
//router.get('/stm/mlab/groups/:id', jwtCheck, function(req,resp, next){

router.get('/stm/mlab/groups/:id',  function(req,resp, next){
      findOne(req,resp, next, db.groups);
} ) ;

// add doc for groups
//router.post('/stm/mlab/groups', jwtCheck, function(req,resp, next) {
router.post('/stm/mlab/groups',  function(req,resp, next) {
   // console.log('rest create');
   var doc = req.body  ; 
   if  (doc.name) {
       delete doc._id ;
       addData(req , resp , next, db.groups, doc) ;
   }else{
       resp.status(400) ; 
       resp.json({"error":"Required data are missing"}) ; 
   }
}) ; 
// update groups
//router.put('/stm/mlab/groups', jwtCheck, function(req,resp, next) {
router.put('/stm/mlab/groups',  function(req,resp, next) {
   // console.log('rest update'); 
   var doc = req.body  ; 
   let id  = doc._id ;
   delete doc._id ;
   updateData(req , resp , next, db.groups, doc ,id) ;

}) ; 

// delete groups
router.delete('/stm/mlab/groups/:id',  function(req,resp, next) {
   deleteData(req , resp , next, db.groups  ) ;
}) ; 

// **********  member ***********************
// get all data from memeber
router.get('/stm/mlab/members',function(req,resp, next){
      findDatas(req,resp, next, db.members , {fname: 1} );
} ) ;
// get one row from member
router.get('/stm/mlab/members/:id', function(req,resp, next){
      findOne(req,resp, next, db.members);
} ) ;

// add doc for memebers
router.post('/stm/mlab/members', function(req,resp, next) {
    console.log('rest create');
   var doc = req.body  ; 
   if  (doc.fname) {
       delete doc._id ;
       addData(req , resp , next, db.members, doc) ;
   }else{
       resp.status(400) ; 
       resp.json({"error":"Required data are missing"}) ; 
   }
}) ; 

// delete memebers
router.put('/stm/mlab/members', function(req,resp, next) {
   // console.log('rest update'); 
   var doc = req.body  ; 
   let id  = doc._id ;
   delete doc._id ;
   updateData(req , resp , next, db.members, doc,id ) ;

}) ; 

// delete memebers
router.delete('/stm/mlab/members/:id', function(req,resp, next) {
   deleteData(req , resp , next, db.members  ) ;
}) ; 


// **********  hymns ***********************
// get all data from hymns
router.get('/stm/mlab/hymns', function(req,resp, next){
      findDatas(req,resp, next, db.hymns, {name:1});
} ) ;
// get one row from hymns
router.get('/stm/mlab/hymns/:id', function(req,resp, next){
      findOne(req,resp, next, db.hymns);
} ) ;

// add doc for hymns
router.post('/stm/mlab/hymns', function(req,resp, next) {
    console.log('rest create');
   var doc = req.body  ; 
   if  (doc.name) {
       delete doc._id ;
       addData(req , resp , next, db.hymns, doc) ;
   }else{
       resp.status(400) ; 
       resp.json({"error":"Required data are missing"}) ; 
   }
}) ; 

// delete hymns
router.put('/stm/mlab/hymns', function(req,resp, next) {
   // console.log('rest update'); 
   var doc = req.body  ; 
   let id  = doc._id ;
   delete doc._id ;
   updateData(req , resp , next, db.hymns , doc ,id) ;

}) ; 

// delete hymns
router.delete('/stm/mlab/hymns/:id', function(req,resp, next) {
   deleteData(req , resp , next, db.hymns  ) ;
}) ; 


// **********  schedule ***********************
// get all data from schedule
router.get('/stm/mlab/schedule', function(req,resp, next){
      findDatas(req,resp, next, db.schedule, {date:-1});
} ) ;
// get one row from hymns
router.get('/stm/mlab/hymns/:id', function(req,resp, next){
      findOne(req,resp, next, db.schedule);
} ) ;

// add doc for schedule
router.post('/stm/mlab/schedule', function(req,resp, next) {
    console.log('rest create');
   var doc = req.body  ; 
   if  (doc.name) {
       delete doc._id ;
       addData(req , resp , next, db.schedule, doc) ;
   }else{
       resp.status(400) ; 
       resp.json({"error":"Required data are missing"}) ; 
   }
}) ; 

// delete schedule
router.put('/stm/mlab/schedule', function(req,resp, next) {
   //console.log('rest update'); 
   var doc = req.body  ; 
   let id  = doc._id ;
   delete doc._id ;
   updateData(req , resp , next, db.schedule , doc, id ) ;

}) ; 

// delete schedule
router.delete('/stm/mlab/schedule/:id', function(req,resp, next) {
   deleteData(req , resp , next, db.schedule  ) ;
}) ; 


// Mail
// delete schedule
router.post('/stm/mlab/email/:id',function(req,resp, next) {
   console.log('rest for mailing'); 
   let id  = req.params.id ;
   console.log('id ' + id); 
   if (id) {
       processMail(id)
   }
   resp.send({success: true}) ;
}) ; 




module.exports = router ;