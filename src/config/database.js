const mongoose = require('mongoose');
const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://root:nodejs@nodetut.bo94b.mongodb.net/devTinder"
    )
}
module.exports = connectDB;

