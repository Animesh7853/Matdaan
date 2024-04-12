const { createHmac, randomBytes } = require("node:crypto");
const { Schema, model } = require('mongoose');
const { createTokenForUser, validateToken } = require('../services/authentication'); 

const voterSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    aadharNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required : true,
    },
    role: {
        type: String,
        enum: ["VOTER", "CANDIDATE", "ADMIN"],
        default: "VOTER",
    },
}, { timestamps: true });

voterSchema.pre("save", function(next) {
    const voter = this;
    if (!voter.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(voter.password).digest('hex');

    voter.salt = salt;
    voter.password = hashedPassword;

    next();
});

voterSchema.statics.matchPasswordAndGenerateToken = async function(email, password) {
    const voter = await this.findOne({ email });
    if (!voter) {
        throw new Error('Voter Not Found');
    }

    const salt = voter.salt;
    const hashedPassword = voter.password;

    const voterProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== voterProvidedHash) {
        throw new Error('Incorrect Password');
    }

    const token = createTokenForUser(voter);
    return token;
};

// Add the getUserByEmail method to the voterSchema
voterSchema.statics.getUserByEmail = async function(email) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Unable to find user');
    }
    return user;
};

const Voter = model('voter', voterSchema);

module.exports = Voter;