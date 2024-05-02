const JWT = require('jsonwebtoken');

const secret = "$uperman@123";

function createTokenForUser(user){

    const payload={
        _id:user._id,
        email:user.email,
        firstName:user.firstName,
        lastName:user.lastName,
        aadharNumber:user.aadharNumber,
        // profileImageURL:user.profileImageURL,
        role:user.role,
    };
    const token = JWT.sign(payload,secret);
    return token;
};

function validateToken(token){
    const payload =JWT.verify(token,secret);
    return payload;
}

module.exports ={
    createTokenForUser,
    validateToken,
};