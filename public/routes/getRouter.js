const express = require("express");
const mysqlConn = require("../config/conexao");

const fetch = require("node-fetch");
const router = express.Router();

const client_id = "61d3ab6e8e2824169a8f";
const client_secret = "748f625cc48676da9b47d45b5f34837b6a9f80f0";

let gitHubName = ""; 
let gitHubEmail = "";

async function getAcessToken(code){
      const res =  await fetch('https://github.com/login/oauth/access_token',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id,
            client_secret,
            code
        })
    });
   const data = await res.text();
   const params = new URLSearchParams(data);
   return params.get("access_token");
};

async function getGitHubUser(access_token){
    const req = await fetch('https://api.github.com/user',{
        headers:{
            Authorization:`bearer ${access_token}`
        }
    });
    const data = await req.json()
    return data
}

router.get('/',(req,res)=>{
    res.render('main');
  
});

router.get('/form',(req,res)=>{
    res.render("index");
  
});

router.get('/login/github',(req,res)=>{
    let url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:3000/user/callback`;
    res.redirect(url);
})

router.get('/user/callback',async (req,res)=>{
    const code = req.query.code;
    const token = await getAcessToken(code);
    const githubUser = await getGitHubUser(token);
    gitHubName = githubUser.name;
    gitHubEmail = githubUser.email;
    res.redirect('/lista');
});

router.get('/cao',(req,res)=>{
    res.render("paginaCao");
  
});

router.get('/gato',(req,res)=>{
    res.render('paginaGato');
  
});

router.get('/lista',(req,res)=>{

   let gitHub = {nome:getName(),email:getEmail()};
    mysqlConn.query("SELECT * FROM pessoas",(err,rows,fields)=>{
        
        if(!err){
            res.render('lista',{
                user : rows,
                gitHub:gitHub
                
            })
            
        }else{
            console.log(err);
        }
    
    })
});

router.get('/edit/:userID',(req,res)=>{
    let userId = req.params.userID;
    let sql= `SELECT * FROM pessoas where id = ${userId}`
    let query = mysqlConn.query(sql,(err,results)=>{
        if(err) throw err;
        res.render('formUpdate',{
            user:results[0]

        })

    })
})

router.get('/delete/:userId',(req,res)=>{
    const userId = req.params.userId;
    let sql = `DELETE  from pessoas where id= ${userId}`;
    let query = mysqlConn.query(sql,(err,results)=>{
        if(err){throw err}
        res.redirect('/lista');

    });

})

function getName(){
    return gitHubName;
}
function getEmail(){
    return gitHubEmail;
}


module.exports = router;
