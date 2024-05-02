const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Voter = require('../models/voter');
const VoterAddress = require('../models/voter-add');
const CandidateAddress = require('../models/candidate-add');
const Vote = require('../models/vote');
const Candidate = require('../models/candidate');

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

        const user = await Voter.findOne({ where: { email: decoded.email } });
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
    const { firstName, lastName, email, aadharNumber, mobileNumber, password } = req.body;
    try {
        const newVoter = await Voter.create({
            firstName,
            lastName,
            email,
            aadharNumber,
            mobileNumber,
            password,
        });
        return res.status(201).json({ msg: "success", voter: newVoter.id, token: req.cookies.token });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await Voter.matchPasswordAndGenerateToken(email, password);
        const user = await Voter.findOne({ where: { email } });

        // Fetch the VoterAddress
        const voterAddress = await VoterAddress.findOne({ where: { voterId: user.id } }) || null;

        return res.cookie("token", token).status(201).json({ msg: "success", token, user, voterAddress });
    } catch (error) {
        console.error(error);
        return res.status(301).json({
            error: "Incorrect Email or Password",
        });
    }
});

router.post('/add-voter', authMiddleware, async (req, res) => {
    const { street, city, state, pinCode } = req.body;
    const voterId = req.user.id;

    try {
        let voterAddress = await VoterAddress.findOne({ where: { voterId } });

        if (voterAddress) {
            // Update existing address
            voterAddress.street = street;
            voterAddress.city = city;
            voterAddress.state = state;
            voterAddress.pinCode = pinCode;
            await voterAddress.save();
            return res.status(200).json({ msg: "Address updated successfully", address: voterAddress });
        } else {
            // Create new address
            const newAddress = await VoterAddress.create({
                voterId,
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

router.get('/election/:electionType', authMiddleware, async (req, res) => {
    try {
        // Fetch the voter's city
        const voterAddress = await VoterAddress.findOne({ where: { voterId: req.user.id } });
        const voterCity = voterAddress.city;

        // Fetch the CandidateIds
        const candidateAddresses = await CandidateAddress.findAll({ where: { city: voterCity } });
        const candidateIds = candidateAddresses.map(address => address.candidateId);

        // Fetch the entire information from the Candidate schema
        const candidates = await Candidate.findAll({ where: { id: candidateIds, election: req.params.electionType } });

        // Return the fetched information
        return res.status(200).json({ candidates });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

router.post('/cast-vote/:electionType', authMiddleware, async (req, res) => {
    try {
        // Check if the voter has already cast a vote for this election type
        const existingVote = await Vote.findOne({ where: { voterId: req.user.id, election: req.params.electionType } });
        if (existingVote) {
            return res.status(400).json({ error: 'You have already cast your vote for this election' });
        }

        // Fetch the voter's city
        const voterAddress = await VoterAddress.findOne({ where: { voterId: req.user.id } });
        const voterCity = voterAddress.city;

        // Fetch the candidate's city
        const candidateAddress = await CandidateAddress.findOne({ where: { candidateId: req.body.candidateId } });
        const candidateCity = candidateAddress.city;

        // Check if the voter's city and the candidate's city are the same
        if (voterCity !== candidateCity) {
            return res.status(400).json({ error: 'Voter and candidate must be from the same city' });
        }

        // Create a new vote
        const vote = await Vote.create({
            voterId: req.user.id,
            candidateId: req.body.candidateId,
            city: voterCity,
            election: req.params.electionType,
        });

        // Return the new vote
        return res.status(201).json({ msg:"success", vote });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie("token").redirect("/signin");
});

module.exports = router;