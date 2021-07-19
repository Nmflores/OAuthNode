const mysql = require("mysql");

var mysqlConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"loja_si2"
});

mysqlConn.connect((err)=>{
    if(!err){
        console.log("ta ok");
    }else{
        console.log("nope");
    }

});
module.exports = mysqlConn;