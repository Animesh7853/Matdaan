const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const { checkForAuthenticationCookie } = require("./middleware/authentication");

const Voter = require('./models/voter');
const Candidate = require('./models/candidate');

const voterRouter = require('./routes/voter');
const candidateRouter = require('./routes/candidate');

const app = express();
const PORT = 8000;

// Enable CORS middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Database
mongoose.connect('mongodb://127.0.0.1:27017/matdaan').then(() => {
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

app.listen(PORT, () => {
    console.log(`Server Started at PORT:${PORT}`);
});
