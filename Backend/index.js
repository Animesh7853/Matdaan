const path = require("path")
const express = require("express");
const mongoose= require("mongoose");
const cookieParser = require('cookie-parser');

const { checkForAuthenticationCookie } = require("./middleware/authentication");

const Voter =require('./models/voter');
const Candidate=require('./models/candidate');


const voterRoter = require('./routes/voter');
const candidateRouter = require('./routes/candidate');



const app =express();
const PORT =8000;

//Database
mongoose.connect('mongodb://127.0.0.1:27017/matdaan').then((e)=> console.log('MongoDB Connected'));

//middleware
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(checkForAuthenticationCookie('token'));



app.use('/voter',voterRoter);
app.use('/candidate',candidateRouter);

app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`));
