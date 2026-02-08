const express = require('express');
const pool = require('./pool');
const upload = require('./multer');
const protectedRoute = require("./protectedRoute")

const router = express.Router();

router.post('/insert_productdetails',protectedRoute,
    upload.fields([
        { name: 'picture', maxCount: 1 },
        { name: 'video', maxCount: 1 }
    ]), function (req, res, next) {
        try {
            console.log(req.body)
            console.log(req.files)
            pool.query("insert into productdetails(serviceid, brandid, productid, productcolorid, productvarientid, imei, productstatus, warranty, ratings, price, offerprice, membershipprice, `condition`, description, stock, picture, video) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.serviceid, req.body.brandid, req.body.productid, req.body.productcolorid, req.body.productvarientid, req.body.imei, req.body.productstatus, req.body.warranty, req.body.ratings, req.body.price, req.body.offerprice, req.body.membershipprice, req.body.condition, req.body.description, req.body.stock, req.files.picture[0].filename, req.files.video[0].filename], function (error, result) {

                if (error) {
                    console.log(error);
                    res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    res.status(200).json({ status: true, message: "Product Detail Sucessfully Inserted" })
                }

            })

        }

        catch (e) {
            console.log(error);
            res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
        }

    });

router.get('/fetch_productdetails', protectedRoute,function (req, res, next) {

    try {

        pool.query(`select * from  productdetails D
                        inner join services S
                        on D.serviceid=S.serviceid
                        inner join brands B
                        on D.brandid=B.brandid
                        inner join products P
                        on D.productid=P.productid
                        inner join productcolors C
                        on D.productcolorid=C.productcolorid
                        inner join productvarients V
                        on D.productvarientid=V.productvarientid
                        `,
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    console.log(result)
                    res.status(200).json({ status: true, message: "Sucess...", data: result })
                }

            })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});


router.post('/fetch_productdetail_by_product',protectedRoute, function (req, res, next) {

    try {
        pool.query(`SELECT pd.*,s.servicetype,s.servicename,s.icon AS service_icon,s.servicestatus,b.brandname,
                b.brandlogo,p.productname,p.productdescription,p.productpicture,pc.productcolor,pv.productram,pv.productstorage
                FROM productdetails pd JOIN services s ON pd.serviceid = s.serviceid
                JOIN brands b ON pd.brandid = b.brandid
                JOIN products p ON pd.productid = p.productid
                JOIN productColors pc ON pd.productcolorid = pc.productcolorid
                JOIN productVarients pv ON pd.productvarientid = pv.productvarientid  where pd.productid=? `, [req.body.productid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                console.log("iamaa",result)
                res.status(200).json({ status: true, message: "Sucess...", data: result })
            }
        })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});

router.post('/update_productdetails',protectedRoute, function (req, res, next) {

    try {
        console.log(req.body)

        pool.query(
            "update productdetails set serviceid=?, brandid=?, productid=?, productcolorid=?,productvarientid=?, imei=?, productstatus=?, warranty=?, ratings=?, price=?, offerprice=?,membershipprice=?, `condition`=?, description=?, stock=? where productdetailid=?",
            [
                req.body.serviceid, req.body.brandid, req.body.productid, req.body.productcolorid, req.body.productvarientid,
                req.body.imei, req.body.productstatus, req.body.warranty, req.body.ratings, req.body.price,
                req.body.offerprice, req.body.membershipprice, req.body.condition, req.body.description, req.body.stock, req.body.productdetailid
            ],
            function (error, result) {

                if (error) {
                    console.log(error);
                    res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    res.status(200).json({ status: true, message: "Product Detail Updated Sucessfully.." })
                }

            })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/update_productdetails_picture',protectedRoute, upload.single("picture"), function (req, res, next) {

    try {
        console.log(req.body)
        console.log(req.file)

        pool.query(
            "update productdetails set picture=? where productdetailid=?",
            [req.file.filename, req.body.productdetailid],
            function (error, result) {

                if (error) {
                    console.log(error);
                    res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    res.status(200).json({ status: true, message: "Product Picture Updated Sucessfully.." })
                }

            })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});

router.post('/update_productdetails_video',protectedRoute, upload.single("video"), function (req, res, next) {

    try {
        console.log(req.body)
        console.log(req.file)

        pool.query(
            "update productdetails set video=? where productdetailid=?",
            [req.file.filename, req.body.productdetailid],
            function (error, result) {

                if (error) {
                    console.log(error);
                    res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    res.status(200).json({ status: true, message: "Product Video Updated Sucessfully.." })
                }

            })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});


router.post('/delete_productdetails',protectedRoute, function (req, res, next) {

    try {
        console.log("DELETE Product Detail ID:", req.body)
        pool.query("delete from productdetails where productdetailid=?", [req.body.productdetailid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Product detail Sucessfully Deleted" })
            }

        })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }

});









module.exports = router;
