const express=require("express");
const router=require("./src/routes/router")
const expressLayouts = require('express-ejs-layouts');
const path= require("path")
const app=express();
const dotenv=require("dotenv").config();
require("./src/config/database")
const session = require('express-session');

var cors = require('cors');
app.use(cors());
  
app.use(session({secret: ' ',saveUninitialized: true,resave: true, cookie: { maxAge: 1000*60*60 }}));


app.use(express.urlencoded())
app.use(express.json());
app.set('view engine', 'ejs');
app.set("views", path.resolve("./src/views"));

app.use(expressLayouts);


app.use(express.static(__dirname + '/public'));  
 

 
  app.use("/", router);
   
 
app.listen(process.env.PORT, ()=>{ console.log("3k is live")})



 