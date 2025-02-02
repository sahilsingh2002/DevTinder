const {Router} = require('express');
const User = require('../models/user');
const {userAuth} = require('../middleware/Auth');
const ConnectionRequest = require('../models/connectionrequest');

const userRouter = Router();
userRouter.get("/connections",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        const allConnections = await ConnectionRequest.find({fromUserId:user._id, status:"accepted"});
        return res.status(200).json(allConnections);

    }
    catch(err){
        res.status(501).send("ERROR: "+ err);
    }
})
userRouter.get("/requests",userAuth,async(req,res)=>{
    try{
        
    }
    catch(err){
        res.status(501).send("ERROR: "+ err);
    }
})
userRouter.get("/profiles",userAuth,async(req,res)=>{
    try{

    }
    catch(err){
        res.status(501).send("ERROR: "+ err);
    }
})