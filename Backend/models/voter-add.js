const { Schema, model } = require('mongoose');

const voterAddressSchema = new Schema({
    voter: {
        type: Schema.Types.ObjectId,
        ref: 'Voter',
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    }
});

module.exports = model('VoterAddress', voterAddressSchema);
