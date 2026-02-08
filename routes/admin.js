var express = require('express');
var router = express.Router();
const pool = require('./pool');
const generateToken = require('./jwt');

/* GET users listing. */
router.post('/adminlogin', function(req, res, next) {
    try {

        pool.query("select * from admin where (emailid=? or mobileno=?) and password=?",[req.body.email,req.body.email,req.body.password],function(error,result){
            console.log(req.body)

            if(error){
                console.log(error);
                res.status(200).json({status:false, message:"Database Error, Pls Contact Backend Team"})
            }
            else{
                if(result.length==0){
                    res.status(200).json({status:false, message:"Invalid Email/Password"})
                }
                else{
                    console.log(result)
                    const token=generateToken({userid:result.emailid})
                    res.status(200).json({status:true, message:"Login Sucessful",data:{result,token}})
                }
            }

        })
        
        
    } catch (error) {
        console.log(error);
        res.status(200).json({status:false, message:"Critical Error, Pls Contact Server Administrator"})
        
    }
  
    
});

module.exports = router;