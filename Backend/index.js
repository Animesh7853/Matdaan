require('dotenv').config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const { checkForAuthenticationCookie } = require("./middleware/authentication");



const voterRouter = require('./routes/voter');
const candidateRouter = require('./routes/candidate');
const resultRouter = require('./routes/result');
const app = express();
const PORT = process.env.PORT;

// Enable CORS middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB Connection Error:', err);
});
// Middleware
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(checkForAuthenticationCookie('token'));

// Routes
app.use('/voter', voterRouter);
app.use('/candidate', candidateRouter);
app.use('/result', resultRouter);

app.listen(PORT, () => {
    console.log(`Server Started at PORT:${PORT}`);
});
