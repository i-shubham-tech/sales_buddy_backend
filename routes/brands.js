var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');
const protectedRoute = require("./protectedRoute")

router.post('/insert_brands',protectedRoute,upload.single('brandlogo') ,function(req, res, next) {
  
    try{

        pool.query("insert into brands(serviceid , brandname,  brandlogo) values(?,?,?)", [req.body.serviceid, req.body.brandname, req.file.filename], function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Brands Sucessfully Inserted"})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }

});

router.post('/delete_brands',protectedRoute ,function(req, res, next) {
  
    try{

        pool.query("delete from brands where brandid=?", [req.body.brandid], function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Brands Sucessfully Deleted"})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }

});


router.get('/fetch_brands',protectedRoute ,function(req, res, next) {
  
    try{

        pool.query("select B.*,S.* from brands B,services S where b.serviceid=S.serviceid", function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Sucess...",data:result})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }


});

router.post('/fetch_brands_by_services',protectedRoute ,function(req, res, next) {
  
    try{

        pool.query("select B.*,S.* from brands B,services S where b.serviceid=S.serviceid and S.serviceid=?",[req.body.serviceid], function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Sucess...",data:result})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }


});




router.post('/edit_brands',protectedRoute ,function(req, res, next) {
  
    try{

        pool.query("update brands set serviceid=?, brandname=?where brandid=? ", [req.body.serviceid, req.body.brandname, req.body.brandid], function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Brandss Updated Sucessfully.."})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }


});

router.post('/update_brandlogo',protectedRoute,upload.single('brandlogo') ,function(req, res, next) {
  
    try{

        pool.query("update brands set brandlogo=? where brandid=?", [req.file.filename, req.body.brandid], function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Brands Icon Updated Sucessfully..."})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }


});



module.exports = router;