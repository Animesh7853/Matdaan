const {Router}= require("express");
const Candidate=require('../models/candidate')

const router = Router();

router.get("/signup",(req,res)=>{
    return res.status(201).json({msg:"pending"});
});

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
        return res.status(201).json({ msg: "success", candidate: newCandidate });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.get("/signin",(req,res)=>{
    return res.status(201).json({ msg: "success" });
});

router.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    try {
        
        const token =await Candidate.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).status(201).json({ msg: "success" });
    } catch (error) {
        return res.status(301).json({
            error:"Incorrect Email or Password",
        });
    }

});

router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/signin");
});



module.exports=router;