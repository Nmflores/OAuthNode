const express = require("express");
const mysqlConn = require("../config/conexao");
const router = express.Router();


router.post('/',(req,res)=>{
    
    let dados = {nome:req.body.nome,email:req.body.email};
    let sql= "INSERT INTO pessoas SET ?";
    
    let query = mysqlConn.query(sql,dados,(err,results)=>{
        if(err) throw err;
    
        res.redirect('/');
    }); 
    
});




module.exports = router;
