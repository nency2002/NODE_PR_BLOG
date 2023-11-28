
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user", 
    }
})

const  userdata= mongoose.model('User', UserSchema)


module.exports = userdata