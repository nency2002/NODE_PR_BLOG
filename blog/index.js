const express = require('express');
const dbconnect = require('./config/database');
const router = require('./routes/user.route');
const blog = require('./routes/blog.route');
const cookies=require("cookie-parser");

const app = express();
app.use(cookies())
app.use(express.json());
app.use(express.urlencoded({extended : true}));
// ejs mate ui ma print karva
app.set("view engine" ,"ejs");
app.set("views",__dirname+'/views');
app.use(express.static(__dirname+"/public"))

app.use("/user",router)
app.use("/blog",blog)

app.get("/",(req,res)=>{
    res.send("<h1> Welcome to the movie API </h1>")
  })

dbconnect();
app.listen(8000 , ()=>{
    console.log(`http://localhost:8000`);
})