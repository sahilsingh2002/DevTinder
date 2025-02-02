const validator = require('validator');

 const userValidation = (req, res, next) =>{
    const {firstName, lastName, emailId, password, age, gender} =req.body;
    try{
        if (!firstName || !lastName || !emailId || !password ){
            throw new Error("Please fill all the fields");
        }
        if(!validator.isEmail(emailId)){
            throw new Error("Invalid Email");
        }
        if(!validator.isStrongPassword(password)){
            throw new Error("Password is not strong enough");
        }
        next();

    }
    catch(err){
        console.error(err);
        res.send("ERROR: "+ err);
    }
}
module.exports = {userValidation};