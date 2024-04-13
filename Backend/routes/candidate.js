const express= require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Candidate=require('../models/candidate');
const VoterAddress = require('../models/voter-add');
const CandidateAddress = require('../models/candidate-add'); // Import the CandidateAddress model

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(cookieParser());

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token || req.cookies.token;
        console.log('Token:', token);
        const decoded = jwt.verify(token, '$uperman@123');
        console.log('Decoded:', decoded);

        const user = await Candidate.findById(decoded._id).catch(err => console.error(err));
        console.log('User:', user);

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};


router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, aadharNumber, mobileNumber, password, election } = req.body;
    try {
        const newCandidate = await Candidate.create({
            firstName,
            lastName,
            email,
            aadharNumber,
            mobileNumber,
            password,
            election
        });
        return res.status(201).json({ msg: "success", Candidate: newCandidate._id, token: req.cookies.token });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await Candidate.matchPasswordAndGenerateToken(email, password);
        const user = await Candidate.getUserByEmail(email);

        // Fetch the CandidateAddress
        const candidateAddress = await CandidateAddress.findOne({ candidate: user._id }) || null;

        return res.cookie("token", token).status(201).json({ msg: "success", token, user, candidateAddress });
    } catch (error) {
        return res.status(301).json({
            error: "Incorrect Email or Password",
        });
    }
});

router.post('/add-candidate', authMiddleware, async (req, res) => {
    const { street, city, state, pinCode } = req.body;
    const candidateId = req.user._id;

    try {
        let candidateAddress = await CandidateAddress.findOne({ candidate: candidateId });

        if (candidateAddress) {
            // Update existing address
            candidateAddress.street = street;
            candidateAddress.city = city;
            candidateAddress.state = state;
            candidateAddress.pinCode = pinCode;
            await candidateAddress.save();
            return res.status(200).json({ msg: "Address updated successfully", address: candidateAddress });
        } else {
            // Create new address
            const newAddress = await CandidateAddress.create({
                candidate: candidateId,
                street,
                city,
                state,
                pinCode,
            });
            return res.status(201).json({ msg: "Address added successfully", address: newAddress });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});



router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/signin");
});


module.exports=router;