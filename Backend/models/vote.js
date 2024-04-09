const { Schema, model } = require('mongoose');

const voteSchema = new Schema({
    voter: {
        type: Schema.Types.ObjectId,
        ref: 'Voter',
        required: true,
    },
    candidate: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    election: {
        type: String,
        enum: ['LOKSABHA', 'VIDHANSABHA', 'MUNICIPAL'],
        required: true,
    },
}, { timestamps: true });

const Vote = model('Vote', voteSchema);

module.exports = Vote;