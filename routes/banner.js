const express = require("express")
const upload = require("./multer")
const pool = require("./pool")
const protectedRoute = require("./protectedRoute")
const router = express.Router()

router.post("/insert_banner", protectedRoute, upload.single("bannerimage"), (req, res, next) => {
    try {
        pool.query("insert into banner (productid,productdetailid,bannerimage) values(?,?,?)", [req.body.productid, req.body.productdetailid, req.file.filename], (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Banner inserted succesfully" })
            }
        })

    }
    catch (e) {
        console.log(error);
        res.status(500).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }



})

router.post("/delete_banner", protectedRoute, (req, res, next) => {
    try {
        pool.query("delete from  banner where bannerid=?", [req.body.bannerid], (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Banner deleted succesfully" })
            }
        })

    }
    catch (e) {
        console.log(error);
        res.status(500).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }



})

router.get("/fetch_banner",protectedRoute, (req, res, next) => {
    try {
        pool.query(`SELECT bn.*,b.brandname,p.productname,pc.productcolorname,pv.productram,pv.productstorage
                from banner bn 
                inner join productdetails pd ON bn.productdetailid = pd.productdetailid
                inner JOIN brands b ON pd.brandid = b.brandid
                inner JOIN products p ON pd.productid = p.productid
                inner JOIN productColors pc ON pd.productcolorid = pc.productcolorid
                inner JOIN productVarients pv ON pd.productvarientid = pv.productvarientid`, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Banner fetch succesfully", data: result })
            }
        })

    }
    catch (e) {
        console.log(error);
        res.status(500).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }



})
module.exports = router