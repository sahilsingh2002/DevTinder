const {Router} = require('express');
const User = require('../models/user');
const {userAuth} = require('../middleware/Auth');
const { updateValidation } = require('../validations/updateValidation');

const profileRouter = Router();

profileRouter.get("/views",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        console.log(user);
        res.send(user);
    }
    catch(err){
        console.error("error",err);
        res.status(501).send("ERROR: "+ err);
    }
})


profileRouter.get("/getUser",async (req,res)=>{
    try{
        const {userID} = req.body;
        if (userID) {
            const user =await User.findById(userID);
            console.log(user);
            res.send(user);
        }
        else{
            res.status(404).json({
                message:"User not found"
            })
    }
}

    catch(err){
        console.error("error",err);
    }
}
)
profileRouter.get("/getUserByEmail",async (req,res)=>{
    try{
        const {email} = req.body;

        if (email) {
            const user =await User.findOne({emailId:email});
            console.log(user);
            res.send(user);
        }
        else{
            res.status(404).json({
                message:"User not found"
            })
    }
}

    catch(err){
        console.error("error",err);
    }
}
)

profileRouter.patch("/updateUser",userAuth,async (req,res)=>{
    try{
       
        if(!updateValidation(req)){
            throw new Error("Cannot update");
        }
        const reqUser = req.user;
        Object.keys(req.body).forEach(key=>reqUser[key]=req.body[key]);
        await reqUser.save();
        res.send("User Updated Successfully");
}

    catch(err){
        console.error("error",err);
        res.status(501).json({
            message:"Internal Server error"
        })
    }
}
)

module.exports = profileRouter;