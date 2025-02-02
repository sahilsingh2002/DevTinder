const {Router, request} = require('express');
const {userAuth} = require('../middleware/Auth');
const ConnectionRequest = require('../models/connectionrequest');
const User = require('../models/user');
const requestRouter = Router();
requestRouter.post('/send/:status/:toUserId',userAuth,async(req,res)=>{
    try{
        const {status,toUserId} = req.params;
        const fromUserId = req.user._id;
        const toUser = await User.findById(toUserId);

    
        if(!toUser){
            throw new Error("User not found");
        }
        if(!status || !toUserId){
            throw new Error("status and toUserId required");
        }
        const existingReq = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
        if(existingReq){
            throw new Error("Request already exists");
        }
        if(!["interested","ignore"].includes(status)){
            throw new Error("status must be either interested or ignore");
        }
        const connect = await new ConnectionRequest({fromUserId,toUserId,status});
        await connect.save();
        res.send(connect);
    }
    catch(err){
        res.status(501).send("ERROR: "+ err);
    }
})
requestRouter.post("/review/:status/:requestId",userAuth,async (req,res)=>{
    try{
        //toUserId = logged in
        const loggedInUser = req.user;
        const {status,requestId} = req.params;
        if(!status || !requestId){
            throw new Error("status and requestId required");
        }
        //status = accepted or rejected
        if(!["accepted","rejected"].includes(status)){
            throw new Error("status must be either accepted or rejected");
        }
        //requestId exists
        const connectionReq = await ConnectionRequest.findOne({_id:requestId,toUserId:loggedInUser._id});
        if(!connectionReq || connectionReq.status !== "interested"){
            throw new Error("Request not found");
        }
        connectionReq.status = status;
        data = await 
        connectionReq.save();
        res.status(200).json({message:"Request status turned to"+status,data});
    }
    catch(err){
        res.status(501).send("ERROR: "+ err);
    }
})

module.exports = requestRouter;