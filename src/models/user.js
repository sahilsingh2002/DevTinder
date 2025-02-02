const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
        
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        enum:["male","female","others"],
        message:"{VALUE} is not a valid gender type"
    }
}, {timestamps:true});
userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"MySecret", {expiresIn:"7d"});
    return token;
}
userSchema.methods.isPasswordValid = async function(password){
    const user = this;
    const isValid = await bcrypt.compare(password,user.password);
    return isValid;
}
const User = mongoose.model("User",userSchema);
module.exports = User;