const path = require("path");
const express = require("express");
const { Sequelize } = require('sequelize');
const cookieParser = require('cookie-parser');

const { checkForAuthenticationCookie } = require("./middleware/authentication");

const Voter = require('./models/voter');
const Candidate = require('./models/candidate');

const voterRouter = require('./routes/voter');
const candidateRouter = require('./routes/candidate');
const resultRouter = require('./routes/result');

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
const sequelize = new Sequelize('matdaan', 'admin', '123456789', {
    host: 'database-1.cvyicsusmibx.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('MySQL Connected');
    })
    .catch(err => {
        console.error('MySQL Connection Error:', err);
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
