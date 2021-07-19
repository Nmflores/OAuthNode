
const express = require("express");
const mysqlConn = require("../config/conexao");
const router = express.Router();

router.post('/',(req,res)=>{
    
    let sql = `update pessoas SET nome='${req.body.nome}', email = '${req.body.email}'   where id = ${req.body.id}`;

    let conn = mysqlConn.query(sql,(err,results)=>{
        if(err){throw err}
        res.redirect('/lista')

    })


})

module.exports= router;
