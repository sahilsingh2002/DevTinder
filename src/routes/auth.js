const {Router} = require('express');

const authRouter = Router();
const {userValidation} = require('../validations/userValidation');
const bcrypt = require('bcrypt');
const User = require('../models/user');

authRouter.post("/signup",userValidation,async (req,res)=>{
    try{
        
        const {firstName, lastName, emailId, password, age, gender} =req.body;
       
            const hashPass = await bcrypt.hash(password,10);
            const user = new User({
                firstName,
                lastName,
                emailId,
                password:hashPass,
                age,
                gender
            });
           await user.save();
           res.send("User Created Successfully");
        

    
}
    catch(err){
        console.error("error",err);
        res.status(501).send("ERROR: "+ err);
    }
})

authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId});
        if(user){
            const isValid = await user.isPasswordValid(password); // in userSchema
            if(isValid){
                const token = await user.getJWT(); // in userSchema 
                res.cookie("token",token,{expires:new Date(Date.now() + (7*24*60*60*1000)),httpOnly:true});
                res.send("Login Success");
            }
            else{
                res.status(401).send("Invalid Credentials");
            }
        }
        else{
            res.status(404).send("User not found");
        }
    }
    catch(err){
        console.error("error",err);
        res.status(501).send("ERROR: "+ err);
    }
}
)
authRouter.post("/logout",async (req,res)=>{
    try{
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("Logged Out Successfully");
    }
    catch(err){
        res.send("Error: "+err);
    }
})



module.exports = authRouter;