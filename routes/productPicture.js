var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');
const protectedRoute = require("./protectedRoute")

router.post('/insert_productpicture',protectedRoute,upload.any() ,function(req, res, next) {
    console.log(req.files)
    try{
        let picture=req.files.map(item=>item.filename)
        picture=picture+" "
       
        pool.query("insert into morepicture(serviceid , brandid,  productid, productdetailid, picture) values(?,?,?,?,?)", [req.body.serviceid, req.body.brandid, req.body.productid, req.body.productdetailid, picture], function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Products picture Sucessfully Inserted"})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }

});

module.exports=router;