const{ createHmac, randomBytes }=require("node:crypto");
const { Schema,model }= require('mongoose');
const { createTokenForUser,validateToken } = require('../services/authentication'); 

const candidateSchema = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    aadharNumber:{
        type: Number,
        required:true,
        unique:true,
    },
    mobileNumber:{
        type: Number,
        required:true,
    },
    salt:{
        type: String,
        // required : true,
    },
    password:{
        type: String,
        required : true,
    },
    role:{
        type:String,
        enum:["VOTER","CANDIDATE","ADMIN"],
        default:"CANDIDATE",
    },
},{timestamps:true});

candidateSchema.pre("save",function(next){
    const candidate =this;
    if(!candidate.isModified("password"))
    return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(candidate.password).digest('hex');

    candidate.salt = salt;
    candidate.password = hashedPassword;

    next();
});

candidateSchema.statics.matchPasswordAndGenerateToken = async function(email, password) {
    const candidate = await this.findOne({ email });
    if (!candidate) {
        throw new Error('Candidate Not Found');
    }

    const salt = candidate.salt;
    const hashedPassword = candidate.password;

    const candidateProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== candidateProvidedHash) {
        throw new Error('Incorrect Password');
    }

    const token = createTokenForUser(candidate);
    return token;
};


const Candidate = model('candidate',candidateSchema);

module.exports=Candidate;