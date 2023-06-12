const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    email:String,
    mobile:Number
});

const user = mongoose.model("user",userSchema);
module.exports = user