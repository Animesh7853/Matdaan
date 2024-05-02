const { Sequelize, DataTypes } = require('sequelize');
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser, validateToken } = require('../services/authentication'); 

const sequelize = new Sequelize('mysql://admin:123456789@maatdaan.cj6c4ei20lt1.us-east-1.rds.amazonaws.com/matdaan_final');

const CandidateAddress = sequelize.define('CandidateAddress', {
  candidateId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Candidates', // name of your model, not the table name
      key: 'id',
    },
    allowNull: false
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pinCode: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

CandidateAddress.sync()

module.exports = CandidateAddress;