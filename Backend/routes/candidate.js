const express= require("express");
const Candidate=require('../models/candidate')
const CandidateAddress = require('../models/candidate-add'); // Import the CandidateAddress model

const router = express.Router();

router.use(express.json());

// router.get("/signup",(req,res)=>{
//     return res.status(201).json({msg:"pending"});
// });

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, aadharNumber, mobileNumber, password } = req.body;
    try {
        const newCandidate = await Candidate.create({
            firstName,
            lastName,
            email,
            aadharNumber,
            mobileNumber,
            password,
        });
        return res.status(201).json({ msg: "success", Candidate: newCandidate._id,token:req.cookies.token});
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// router.get("/signin",(req,res)=>{
//     return res.status(201).json({ msg: "success" });
// });

router.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    try {
        
        const token =await Candidate.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).status(201).json({ msg: "success",token });
    } catch (error) {
        return res.status(301).json({
            error:"Incorrect Email or Password",
        });
    }

});

router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/signin");
});

router.post('/add-candidate', async (req, res) => {
    const { street, city, state, pinCode } = req.body;
    const candidateId = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id

    try {
        const newAddress = await CandidateAddress.create({
            candidate: candidateId,
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




module.exports=router;