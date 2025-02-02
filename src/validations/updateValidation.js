const updateValidation = (req)=>{
   
        const canUpdate = ["firstName","lastName","age","gender"];
        const reqUser = req.body;
       
        const isUpdatable = Object.keys(reqUser).every(key=>canUpdate.includes(key));
       
        return isUpdatable;
}
module.exports = {updateValidation};
// create conn req schema
// send Connectioon request api
// proper validation of