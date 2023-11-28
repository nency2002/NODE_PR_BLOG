const mongoose  = require('mongoose');

const dbconnect =async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/BLOG');
    console.log("connection to MongoDB");
}

module.exports=dbconnect