var express = require('express');
const pool = require('./pool');
const { sendEmail } = require('./smsapi');
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
var router = express.Router();
const crypto = require('crypto');



/* GET users listing. */
router.get("/userinterface_fetch_banner", (req, res, next) => {
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
                res.setHeader("Cache-Control", "no-cache");
                res.setHeader("ETag", "v1");
                res.status(200).json({ status: true, message: "Banner fetch succesfully", data: result })
            }
        })
    }
    catch (e) {
        console.log(error);
        res.status(500).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }



})
router.get('/userinterface_fetch_brands', function (req, res, next) {

    try {
        console.log(req.headers["if-none-match"]);
        pool.query("select B.*,S.* from brands B,services S where B.serviceid=S.serviceid", function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Sucess...", data: result })
            }

        })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/userinterface_fetch_ads', function (req, res, next) {

    try {

        pool.query("select * from ads where imageNumber=?", [req.body.imageNumber], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Sucess...", data: result })
            }

        })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/userinterface_fetch_productdetail_by_status', function (req, res, next) {
    try {
        pool.query(`SELECT pd.*,s.servicetype,s.servicename,s.icon AS service_icon,s.servicestatus,b.brandname,
                b.brandlogo,p.productname,p.productdescription,p.productpicture,pc.productcolor,pc.productcolorname,pv.productram,pv.productstorage
                FROM productdetails pd JOIN services s ON pd.serviceid = s.serviceid
                JOIN brands b ON pd.brandid = b.brandid
                JOIN products p ON pd.productid = p.productid
                JOIN productColors pc ON pd.productcolorid = pc.productcolorid
                JOIN productVarients pv ON pd.productvarientid = pv.productvarientid where status=? `,
            [req.body.status], function (error, result) {

                if (error) {
                    console.log(error);
                    res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    res.status(200).json({ status: true, message: "Sucess...", data: result })
                }
            })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/userinterface_fetch_productdetail_by_id', function (req, res, next) {
    try {
        pool.query(`SELECT pd.*,s.servicetype,s.servicename,s.icon AS service_icon,s.servicestatus,b.brandname,
                b.brandlogo,p.productname,p.productdescription,p.productpicture,pc.productcolor,pc.productcolorname,pv.productram,pv.productstorage
                FROM productdetails pd JOIN services s ON pd.serviceid = s.serviceid
                JOIN brands b ON pd.brandid = b.brandid
                JOIN products p ON pd.productid = p.productid
                JOIN productColors pc ON pd.productcolorid = pc.productcolorid
                JOIN productVarients pv ON pd.productvarientid = pv.productvarientid where productdetailid=? `,
            [req.body.productdetailid], function (error, result) {

                if (error) {
                    console.log(error);
                    res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    res.status(200).json({ status: true, message: "Sucess...", data: result[0] })
                }
            })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.get('/userinterface_fetch_category', function (req, res, next) {

    try {

        pool.query("select * from services", function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Sucess...", data: result })
            }

        })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/userinterface_fetch_colors', function (req, res, next) {

    try {

        pool.query("select * from productcolors where productid=?", [req.body.productid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Sucess...", data: result })
            }

        })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/userinterface_fetch_ram', function (req, res, next) {

    try {

        pool.query("select distinct(productram) from  productvarients where productid=?", [req.body.productid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Sucess...", data: result })
            }

        })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/userinterface_fetch_storage', function (req, res, next) {

    try {

        pool.query("select distinct(productstorage) from  productvarients  where productid=?", [req.body.productid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Sucess...", data: result })
            }

        })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/userinterface_fetch_image_by_id', function (req, res, next) {
    try {
        pool.query(`SELECT * from morepicture where productdetailid=? `,
            [req.body.productdetailid], function (error, result) {

                if (error) {
                    console.log(error);
                    res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    console.log(result);
                    res.status(200).json({ status: true, message: "Sucess...", data: result[0] })
                }
            })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/userinterface_fetch_productdetailid_by_product&color', function (req, res, next) {

    try {

        pool.query(`SELECT * FROM productdetails PD inner join productcolors PC on PD.productcolorid=PC.productcolorid 
                    where PD.productid=? and PC.productcolorname=?`,
            [req.body.productid, req.body.data], function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(400).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    console.log(result)
                    res.status(200).json({ status: true, message: "Sucess...", data: result[0] })
                }

            })

    }

    catch (e) {
        console.log(error);
        res.status(400).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/userinterface_handle_user', function (req, res, next) {
    try {
        if (!req.body?.emailid && !req.body?.mobileno) {
            res.status(400).json({ status: false, message: "Invalid credential" })

        }
        else {
            pool.query("select * from users where mobileno=? or emailid=? ", [req.body?.mobileno, req.body?.emailid], function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    if (result.length == 0) {
                        // USER  doesn't exist, create new user
                        pool.query("insert into users (mobileno,emailid) values(?,?)", [req.body?.mobileno, req.body?.emailid], function (error, insertResult) {
                            if (error) {
                                console.log(error);
                                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                            }
                            else {
                                console.log(insertResult)
                                // After creating, fetch the newly created user
                                pool.query("select * from users where userid=?", [insertResult.insertId], function (error, newResult) {
                                    if (error) {
                                        console.log(error);
                                        res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                                    }
                                    else {
                                        res.status(200).json({ status: true, message: "New User Created Successfully", data: newResult[0] })
                                    }
                                })
                            }
                        })
                    }
                    else {
                        // Mobile number exists, return existing user data
                        res.status(200).json({ status: true, message: "User Found", data: result[0] })
                    }
                }
            })
        }
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }
});
router.post('/send-otp', async function (req, res, next) {
    try {
        const { code } = req.body;
        await sendEmail(code);
        res.status(200).json({ status: true, message: "OTP sent successfully" });
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ status: false, message: "Failed to send OTP" });
    }
});
router.post('/userinterface_submit_personalinfo', function (req, res, next) {
    try {
        pool.query("update users set mobileno=?, emailid=?, username=?, title=?, firstname=?, middlename=?, lastname=?, gender=? where userid=?",
            [req.body.mobileno, req.body.emailid, req.body.username, req.body.title, req.body.firstname, req.body.middlename, req.body.lastname, req.body.gender, req.body.userid],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(400).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    res.status(200).json({
                        status: true,
                        message: "Profile Updated Successfully",
                    })

                }
            })
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }
});
router.post('/userinterface_add_address', function (req, res, next) {
    try {
        pool.query("insert into useraddress ( mobileno, addressNickname, state, city, address, pincode, landmark, addressType,area) values(?,?,?,?,?,?,?,?,?)",
            [req.body.mobileno,
            req.body.addressNickname,
            req.body.state,
            req.body.city,
            req.body.address,
            req.body.pincode,
            req.body.landmark,
            req.body.addressType,
            req.body.area],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(400).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    res.status(200).json({
                        status: true,
                        message: "Address Added Successfully",
                    })
                }
            })
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }
});
router.post('/userinterface_fetch_user_address', function (req, res, next) {
    try {
        pool.query("select * from useraddress where mobileno=?",
            [req.body.mobileno],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(400).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    res.status(200).json({
                        status: true,
                        message: "Success",
                        data: result
                    })
                }
            })
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }
});
router.get('/userinterface_fetch_productdetail', function (req, res, next) {
    try {
        pool.query(`SELECT pd.*,s.servicetype,s.servicename,s.icon AS service_icon,s.servicestatus,b.brandname,
                b.brandlogo,p.productname,p.productdescription,p.productpicture,pc.productcolor,pc.productcolorname,pv.productram,pv.productstorage
                FROM productdetails pd JOIN services s ON pd.serviceid = s.serviceid
                JOIN brands b ON pd.brandid = b.brandid
                JOIN products p ON pd.productid = p.productid
                JOIN productColors pc ON pd.productcolorid = pc.productcolorid
                JOIN productVarients pv ON pd.productvarientid = pv.productvarientid`, function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Sucess...", data: result })
            }
        })

    }

    catch (e) {
        console.log(error);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }


});
router.post('/userinterface_addorder', function (req, res, next) {
    try {
        pool.query("insert into orders (mobileno, status) values(?,'success')",
            [req.body.mobileno],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(400).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
                }
                else {
                    res.status(200).json({
                        status: true,
                        message: "Order Added Successfully",
                    })
                }
            })
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }
});

// API endpoint to add item to wishlist
router.post('/userinterface_add_wishlist', function (req, res, next) {
    try {
        console.log(req.body)
        // Check if item already exists in wishlist
        pool.query("SELECT * FROM wishlist WHERE userid=? AND productdetailid=?",
            [req.body.userid, req.body.productdetailid],
            function (error, result) {
                if (error) {
                    console.log(error);
                    return res.status(400).json({
                        status: false,
                        message: "Database Error, Please Contact Backend Team"
                    });
                }

                if (result.length > 0) {
                    return res.status(200).json({
                        status: false,
                        message: "Item already exists in wishlist"
                    });
                } else {
                    pool.query("insert into wishlist (userid, productdetailid) values(?, ?)",
                        [req.body.userid, req.body.productdetailid],
                        function (error, result) {
                            if (error) {
                                console.log(error);
                                res.status(400).json({
                                    status: false,
                                    message: "Database Error, Please Contact Backend Team"
                                })
                            } else {
                                res.status(200).json({
                                    status: true,
                                    message: "Item Added to Wishlist Successfully"
                                })
                            }
                        })
                }
            })

    } catch (e) {
        // Handle any unexpected errors
        console.log(e);
        res.status(500).json({
            status: false,
            message: "Critical Error, Please Contact Server Administrator"
        })
    }
});

router.post('/userinterface_fetch_wishlist', function (req, res, next) {
    try {
        pool.query(`SELECT pd.*,s.servicetype,s.servicename,s.icon AS service_icon,s.servicestatus,b.brandname,
                b.brandlogo,p.productname,p.productdescription,p.productpicture,pc.productcolor,pc.productcolorname,pv.productram,pv.productstorage,w.date
                FROM productdetails pd 
                JOIN services s ON pd.serviceid = s.serviceid
                JOIN brands b ON pd.brandid = b.brandid
                JOIN products p ON pd.productid = p.productid
                JOIN productColors pc ON pd.productcolorid = pc.productcolorid
                JOIN productVarients pv ON pd.productvarientid = pv.productvarientid
                JOIN wishlist w ON pd.productdetailid = w.productdetailid
                WHERE w.userid = ?`,
            [req.body.userid],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(400).json({
                        status: false,
                        message: "Database Error, Please Contact Backend Team"
                    })
                } else {
                    res.status(200).json({
                        status: true,
                        message: "Success",
                        data: result
                    })
                }
            })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: false,
            message: "Critical Error, Please Contact Server Administrator"
        })
    }
});

router.post('/userinterface_delete_wishlist', function (req, res, next) {
    try {
        // Insert new wishlist item with current date
        pool.query("delete from wishlist where userid=? and productdetailid=? ",
            [req.body.userid, req.body.productdetailid],
            function (error, result) {
                if (error) {
                    // Log and return database errors
                    console.log(error);
                    res.status(400).json({
                        status: false,
                        message: "Database Error, Please Contact Backend Team"
                    })
                } else {
                    // Return success response
                    res.status(200).json({
                        status: true,
                        message: "Item deleted to Wishlist Successfully"
                    })
                }
            })
    } catch (e) {
        // Handle any unexpected errors
        console.log(e);
        res.status(500).json({
            status: false,
            message: "Critical Error, Please Contact Server Administrator"
        })
    }
});

//create order id
//verify payment


//   key_id: 'rzp_test_JFINrkNBMU7uzn',
//   key_secret: 'RX8tuynyjVLStLrUS85WLzOg'
// Initialize Razorpay
// Initialize Razorpay instance
// orderno, userid, orderdate, totalamount, paymentmode, transactionid
// orderdetailid, orderno, productdetailid, quantity, price, offerprice, totalprice, address, deliverystatus,paymentstatus
router.post('/create-order', async (req, res) => {
    try {
        console.log(req.body)
        const { userid, totalamount, cart, paymentmode, address } = req.body;

        pool.query("insert into orders (userid,totalamount,paymentmode) values(?,?,?)",
            [userid, totalamount, paymentmode], function (error, result) {
                if (error) {
                    console.log(error);
                    return res.status(400).json({ status: false, message: "Database Error" });
                }
                else {

                    const orderno = result.insertId;

                    // Insert into orderdetails table
                    cart.forEach(item => {
                        pool.query("insert into orderdetails (orderno,productdetailid,quantity,price,offerprice,address) values (?,  ?, ?, ?, ?, ?)",
                            [orderno, item.productdetailid, item.quantity, item.price, item.offerprice, address],
                            function (error) {
                                if (error) {
                                    console.log(error);
                                    return res.status(400).json({ status: false, message: "Database Error" });
                                }
                            }
                        );
                    });

                    res.status(200).json({
                        status: true,
                        orderno: orderno
                    });
                }
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Server Error" });
    }
});

router.post('/verify-payment', async (req, res) => {
    try {
        console.log(req.body)
        const { transactionid, orderno } = req.body;

        pool.query("UPDATE orders SET transactionid =? where orderno = ?",
            [transactionid, orderno],
            function (error) {
                if (error) {
                    console.log("Database error during update:", error);
                    return res.status(500).json({ status: false, message: "Database Error" });
                }
            });

        pool.query("UPDATE orderdetails SET paymentstatus = 'paid' WHERE orderno = ?",
            [orderno],
            function (error) {
                if (error) {
                    console.log("Database error during update:", error);
                    return res.status(500).json({ status: false, message: "Database Error" });
                }
                res.status(200).json({
                    status: true,
                    message: "Payment status updated successfully"
                });
            });
    } catch (error) {
        console.log("Error in payment status update:", error);
        res.status(500).json({ status: false, message: "Server Error" });
    }
});


router.post('/get-my-orders', async (req, res) => {
    try {
        // Get user's mobile number from request body
        const { userid } = req.body;

        // SQL query to fetch order details with product information
        const query = `
             SELECT 
				od.orderdetailid as id,
                p.productname as productName,
                p.productpicture as productImage,
                o.orderdate as orderDate,
                od.quantity,
                od.offerprice as price,
                od.deliverystatus as status,
                od.address,
                od.paymentstatus,
                o.paymentmode
            FROM orderdetails od
            JOIN orders o ON od.orderno = o.orderno
            JOIN productdetails pd ON od.productdetailid = pd.productdetailid
            JOIN products p ON pd.productid = p.productid
            WHERE o.userid = ?
            ORDER BY o.orderdate DESC
        `;

        // Execute the query
        pool.query(query, [userid], (error, results) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({
                    status: false,
                    message: "Database Error, Please Contact Backend Team"
                });
            }

            else {
                res.status(200).json({
                    status: true,
                    message: "Orders fetched successfully",
                    data: results
                });
            }

            // Send successful response

        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            status: false,
            message: "Critical Error, Please Contact Server Administrator"
        });
    }
});


router.post('/search', async (req, res) => {
    try {
        const serachtag = req.body.search
        const query = `SELECT 
                     p.productname,
                     p.productid,
                     pc.productcolorname,
                     pv.productram,
                     pv.productstorage,
                     pd.price,
                     pd.productdetailid,
                     pd.offerprice,
                      pd.ratings,
                     pd.picture
                    

                FROM productdetails pd
                JOIN products p ON pd.productid = p.productid
                JOIN brands b ON pd.brandid = b.brandid
                JOIN productcolors pc ON pd.productcolorid = pc.productcolorid
                JOIN productvarients pv ON pd.productvarientid = pv.productvarientid

                WHERE 
                    MATCH(p.productname) AGAINST ( ? IN NATURAL LANGUAGE MODE)
                    OR MATCH(b.brandname) AGAINST ( ? IN NATURAL LANGUAGE MODE)
                    OR MATCH(pd.description) AGAINST (? IN NATURAL LANGUAGE MODE)
                    limit 12`

        pool.query(query,
            [serachtag, serachtag, serachtag],
            function (error, result) {
                if (error) {
                    // Log and return database errors
                    console.log(error);
                    res.status(400).json({
                        status: false,
                        message: "Database Error, Please Contact Backend Team"
                    })
                } else {
                    // Return success response
                    res.status(200).json({
                        status: true,
                        message: "Item fetch successfully",
                        data: result
                    })
                }
            })

    } catch (error) {

    }
});

router.post('/fetch_product_by_brand', async (req, res) => {
    try {
        const query = `SELECT 
                     p.productname,
                     p.productid,
                     pc.productcolorname,
                     pv.productram,
                     pv.productstorage,
                     pd.price,
                     pd.productdetailid,
                     pd.offerprice,
                      pd.ratings,
                     pd.picture
                    

                FROM productdetails pd
                JOIN products p ON pd.productid = p.productid
                JOIN brands b ON pd.brandid = b.brandid
                JOIN productcolors pc ON pd.productcolorid = pc.productcolorid
                JOIN productvarients pv ON pd.productvarientid = pv.productvarientid

                WHERE b.brandid=?
                   `

        pool.query(query,
            [req.body.brandid],
            function (error, result) {
                if (error) {
                    // Log and return database errors
                    console.log(error);
                    res.status(400).json({
                        status: false,
                        message: "Database Error, Please Contact Backend Team"
                    })
                } else {
                    // Return success response
                    res.status(200).json({
                        status: true,
                        message: "Item fetch successfully",
                        data: result
                    })
                }
            })

    } catch (error) {

    }
});




module.exports = router;









