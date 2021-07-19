const mysql  = require("mysql");
const express = require("express");

const mysqlConn = require("./config/conexao");

const getRouter = require("./routes/getRouter");

const postRouter = require("./routes/postRouter");

const updateRouter = require('./routes/updateRouter');

var servidor = express();

servidor.use(express.json());

servidor.use(express.urlencoded(extended=false));

servidor.set('view engine','ejs');

servidor.use('/',getRouter);
servidor.use('/lista',getRouter);
servidor.use('/salva',postRouter);
servidor.use('/update',updateRouter);

servidor.use(express.static("views"));

servidor.listen(3000);
