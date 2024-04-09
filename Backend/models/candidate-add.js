const { Schema, model } = require('mongoose');

const candidateAddressSchema = new Schema({
    candidate: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate',
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

module.exports = model('CandidateAddress', candidateAddressSchema);
