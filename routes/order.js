const express = require('express')
var pool = require('./pool');
const protectedRoute = require("./protectedRoute")
const router = express.Router()

router.get("/fetch-orders",protectedRoute, (req, res, next) => {
    const query = `select O.orderno 'Order No',U.username 'Customer',P.productname 'Product',O.orderdate 'Order Date',OD.offerprice 'Price',OD.quantity 'Quantity',OD.totalprice 'Total Amount',OD.paymentstatus 'Payment Status',O.paymentmode as 'Payment Mode'  from orders O inner join orderdetails OD
                    on O.orderno=OD.orderno inner join users U
                    on O.userid=U.userid inner join productdetails PD
                    on OD.productdetailid=PD.productdetailid inner Join products P
                    on PD.productid=P.productid`
    pool.query(query, (error, result) => {
        if (error) {
            res.status(400).json({ status: false, message: "Database error", data: [] })
        }
        else {
            res.status(200).json({ status: true, message: "Order Fetch Succesfully", data: result})

        }
    })
})

router.post("/fetch-orders-by-day",protectedRoute, (req, res, next) => {
   
    console.log(req.body)
    
    const query = `select O.orderno 'Order No',U.username 'Customer',P.productname 'Product',O.orderdate 'Order Date',OD.offerprice 'Price',OD.quantity 'Quantity',OD.totalprice 'Total Amount',OD.paymentstatus 'Payment Status',O.paymentmode as 'Payment Mode'  from orders O inner join orderdetails OD
                    on O.orderno=OD.orderno inner join users U
                    on O.userid=U.userid inner join productdetails PD
                    on OD.productdetailid=PD.productdetailid inner Join products P
                    on PD.productid=P.productid where date_format(orderdate,'%Y-%m-%d') = ?`
    pool.query(query,[req.body.orderDate], (error, result) => {
        if (error) {
            res.status(400).json({ status: false, message: "Database error", data: [] })
        }
        else {
            res.status(200).json({ status: true, message: "Order Fetch Succesfully", data: result})

        }
    })
})

router.post("/fetch-orders-by-date",protectedRoute, (req, res, next) => {
   
    console.log(req.body)
    
    const query = `select O.orderno 'Order No',U.username 'Customer',P.productname 'Product',O.orderdate 'Order Date',OD.offerprice 'Price',OD.quantity 'Quantity',OD.totalprice 'Total Amount',OD.paymentstatus 'Payment Status',O.paymentmode as 'Payment Mode'  from orders O inner join orderdetails OD
                    on O.orderno=OD.orderno inner join users U
                    on O.userid=U.userid inner join productdetails PD
                    on OD.productdetailid=PD.productdetailid inner Join products P
                    on PD.productid=P.productid where date_format(orderdate,'%Y-%m-%d') between ? and ?`
    pool.query(query,[req.body.from,req.body.to], (error, result) => {
        if (error) {
            res.status(400).json({ status: false, message: "Database error", data: [] })
        }
        else {
            res.status(200).json({ status: true, message: "Order Fetch Succesfully", data: result})
        }
    })
})

module.exports = router;