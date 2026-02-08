var express = require('express');
var router = express.Router();
var upload=require('./multer')
var pool=require("./pool")
const protectedRoute = require("./protectedRoute")
/* GET home page. */
router.post('/insert_services',protectedRoute,upload.single('icon'), function(req, res, next) {
  try{
     pool.query("insert into services (servicetype,servicename,icon,servicestatus) values(?,?,?,?)",[req.body.servicetype,req.body.servicename,req.file.filename,req.body.servicestatus],function(error,result){
       if(error)
       {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error,Pls Contact Backend Team'})
       }
       else
       {
        res.status(200).json({status:true,message:'Services Successfully Submitted..'})
       }

     })


  }
  catch(e)
  { console.log("EE",error)
    res.status(200).json({status:false,message:'Critical Error,Pls Contact Server Administrator'})
  }
});


router.post('/update_icon',protectedRoute,upload.single('icon'), function(req, res, next) {
  try{
     pool.query("update services set icon=? where serviceid=?",[req.file.filename,req.body.serviceid],function(error,result){
       if(error)
       {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error,Pls Contact Backend Team'})
       }
       else
       {
        res.status(200).json({status:true,message:'Service Icon Updated Successfully..'})
       }

     })


  }
  catch(e)
  { console.log("EE",error)
    res.status(200).json({status:false,message:'Critical Error,Pls Contact Server Administrator'})
  }
});


router.get('/fetch_services',protectedRoute, function(req, res, next) {
  try{
     pool.query("select * from services",function(error,result){
       if(error)
       {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error,Pls Contact Backend Team'})
       }
       else
       {
        res.status(200).json({status:true,message:'Success..',data:result})
       }

     })


  }
  catch(e)
  { console.log("EE",error)
    res.status(200).json({status:false,message:'Critical Error,Pls Contact Server Administrator'})
  }
});


router.post('/edit_services', protectedRoute,function(req, res, next) {
  try{
     pool.query("update services set servicetype=?,servicename=?,servicestatus=? where serviceid=?" ,[req.body.servicetype,req.body.servicename,req.body.servicestatus,req.body.serviceid],function(error,result){
       if(error)
       {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error,Pls Contact Backend Team'})
       }
       else
       {
        res.status(200).json({status:true,message:'Services Updated Successfully..'})
       }

     })


  }
  catch(e)
  { console.log("EE",error)
    res.status(200).json({status:false,message:'Critical Error,Pls Contact Server Administrator'})
  }
});

router.post('/delete_services',protectedRoute, function(req, res, next) {
  try{
     pool.query("delete  from services  where serviceid=?" ,[req.body.serviceid],function(error,result){
       if(error)
       {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error,Pls Contact Backend Team'})
       }
       else
       {
        res.status(200).json({status:true,message:'Services Deleted Successfully..'})
       }

     })


  }
  catch(e)
  { console.log("EE",error)
    res.status(200).json({status:false,message:'Critical Error,Pls Contact Server Administrator'})
  }
});


module.exports = router;
