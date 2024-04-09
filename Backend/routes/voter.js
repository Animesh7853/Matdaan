const express= require("express");
const Voter=require('../models/voter')
const VoterAddress = require('../models/voter-add'); // Import the VoterAddress model
const CandidateAddress = require('../models/candidate-add');
const Candidate = require('../models/candidate'); // Import the Candidate model


const router = express.Router();
router.use(express.json());

// router.get("/signup",(req,res)=>{
//     return res.status(201).json({msg:"pending"});
// });

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
        return res.status(201).json({ msg: "success", voter: newVoter._id,token:req.cookies.token });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


router.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    try {
        
        const token =await Voter.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).status(201).json({ msg: "success",token });
    } catch (error) {
        return res.status(301).json({
            error:"Incorrect Email or Password",
        });
    }

});


router.post('/add-voter', async (req, res) => {
    const { street, city, state, pinCode } = req.body;
    const voterId = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id

    try {
        const newAddress = await VoterAddress.create({
            voter: voterId,
            street,
            city,
            state,
            pinCode,
        });

        return res.status(201).json({ msg: "Address added successfully", address: newAddress });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


router.get('/cast-vote', async (req, res) => {
    const voterId = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id

    try {
        // Find the voter's address to get the city
        const voterAddress = await VoterAddress.findOne({ voter: voterId });
        if (!voterAddress) {
            console.log("Voter's address not found");
            return res.status(404).json({ error: "Voter's address not found" });
        }

        const city = voterAddress.city;
        console.log("Voter's city:", city);

        // Find all candidates with the same city
        const candidateAddresses = await CandidateAddress.find({ city });

        if (!candidateAddresses || candidateAddresses.length === 0) {
            console.log("No candidates found in the same city");
            return res.status(404).json({ error: "No candidates found in the same city" });
        }

        // Extract candidate IDs
        const candidateIds = candidateAddresses.map(candidateAddress => candidateAddress.candidate);

        // Find candidate details based on IDs
        const candidates = await Candidate.find({ _id: { $in: candidateIds } });

        // Extract relevant candidate information
        const candidateInfo = candidates.map(candidate => ({
            id: candidate._id,
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            city: city, // Assuming you want to return the same city for all candidates
            election: candidate.election
        }));

        console.log("Candidates in the same city:", candidateInfo);

        return res.status(200).json({ candidates: candidateInfo });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/signin");
});

module.exports=router;