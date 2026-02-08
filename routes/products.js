var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');
const protectedRoute = require("./protectedRoute")

router.post('/insert_products',protectedRoute,upload.single('productpicture') ,function(req, res, next) {
  
    try{

        pool.query("insert into products(serviceid , brandid,  productname, productdescription, productpicture) values(?,?,?,?,?)", [req.body.serviceid, req.body.brandid, req.body.productname, req.body.productdescription, req.file.filename], function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Products Sucessfully Inserted"})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }

});

router.post('/delete_products',protectedRoute ,function(req, res, next) {
  
    try{

        pool.query("delete from products where productid=?", [req.body.productid], function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Products Sucessfully Deleted"})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }

});

router.post('/edit_products' ,protectedRoute,function(req, res, next) {
  
    try{

        pool.query("update products set serviceid=?, brandid=?, productname=?, productdescription=? where productid=? ", [req.body.serviceid, req.body.brandid, req.body.productname, req.body.productdescription, req.body.productid], function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Products Updated Sucessfully.."})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }


});



router.get('/fetch_products',protectedRoute,function(req, res, next) {
  
    try{

        pool.query("select P.*,B.*,S.* from products P,brands B,services S where P.brandid=B.brandid and P.serviceid=S.serviceid", function(error,result){

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

router.post('/fetch_product_by_brand',protectedRoute,function(req, res, next) {
  
    try{

        pool.query("select * from products where brandid=?",[req.body.brandid], function(error,result){

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

router.post('/update_icon',upload.single('productpicture') ,function(req, res, next) {
  
    try{

        pool.query("update products set productpicture=? where productid=?", [req.file.filename, req.body.productid], function(error,result){

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                res.status(200).json({status:true, message:"Products Icon Updated Sucessfully..."})
            }

        })

    }

    catch(e){
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
    }


});



module.exports = router;