const mysql=require("mysql2")

const db=mysql.createConnection({
    host:"localhost",
    user:process.env.SQL_USER,
    password:process.env.SQL_PASSWORD,
    database:"product-management"
})



module.exports = db;
