const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth = async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Unauthorised");
        }
        const {_id} = jwt.verify(token,"MySecret");
        if(!_id){
            throw new Error("Unauthorised");
        }
        const user = await User.findById(_id);
        req.user = user;
        next();
    }
    catch(err){
        res.status(501).send("ERROR: "+ err);
    }
}
module.exports = {
   userAuth
}