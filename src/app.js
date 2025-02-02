const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { ReturnDocument } = require('mongodb');
const validator = require('validator');
const { userValidation } = require('./validations/userValidation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use(express.json());
app.use(cookieParser());
app.use("/auth",authRouter);
app.use("/profile",profileRouter);
app.use("/request",requestRouter);



connectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log("server running on port ", 3000);
        })
        console.info("connected to database");
    })
    .catch(err => {
        console.error("error", err);
    })

