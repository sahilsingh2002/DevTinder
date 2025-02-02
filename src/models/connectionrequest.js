const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.ObjectId,
        required:true,
       

    },
    toUserId:{
        type: mongoose.Schema.ObjectId,
        required:true,
      
    },
    status:{
        type:String,
        required:true,
        enum:["interested","ignore","accepted","rejected"],
        message:"{VALUE} is not a status type"
    }
},{timestamps:true});
connectionRequestSchema.pre("save",async function(next){
    connectionReq = this;
    if(connectionReq.fromUserId.equals(connectionReq.toUserId)){
        throw new Error("Cannot send request to self"); 
    }
    next();
})
connectionRequestSchema.index({fromUserId:1,toUserId:1},{unique:true});
const ConnectionRequest = mongoose.model('ConnectionRequest',connectionRequestSchema);
module.exports = ConnectionRequest;