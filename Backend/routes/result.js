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

router.post('/', async (req, res) => {
    try {
        const { city, electionType } = req.body;

        // Find candidates based on election type
        const candidates = await Candidate.find({ election: electionType });

        // Find addresses of these candidates
        const addresses = await CandidateAddress.find({ 
            candidate: { $in: candidates.map(candidate => candidate._id) },
            city: city
        });

        // Filter candidates based on city
        const filteredCandidates = candidates.filter(candidate => 
            addresses.some(address => address.candidate.toString() === candidate._id.toString())
        );

        // Find votes for the filtered candidates
        const votes = await Vote.find({ candidate: { $in: filteredCandidates.map(candidate => candidate._id) } });

        // Count the number of votes for each candidate
        const voteCounts = {};
        for (const vote of votes) {
            const candidateId = vote.candidate.toString();
            if (voteCounts[candidateId]) {
                voteCounts[candidateId]++;
            } else {
                voteCounts[candidateId] = 1;
            }
        }

        // Prepare the response data
        const result = filteredCandidates.map(candidate => ({
            candidateId: candidate._id,
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            voteCount: voteCounts[candidate._id] || 0
        }));

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
