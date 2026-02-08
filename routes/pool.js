var mysql=require("mysql2") 
const dotenv = require("dotenv")
dotenv.config()


var pool=mysql.createPool({
host:process.env.DB_HOST,
port:process.env.DB_PORT || 3306,
user:process.env.DB_USER,
password:process.env.DB_PASSWORD,
database:process.env.DB_NAME,
multipleStatements:true,
connectionLimit:process.env.DB_CONNECTION_LIMIT || 100

})

module.exports=pool