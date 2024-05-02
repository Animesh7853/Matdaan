const { Sequelize, DataTypes } = require('sequelize');
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser, validateToken } = require('../services/authentication'); 

const sequelize = new Sequelize('mysql://admin:123456789@database-1.cvyicsusmibx.us-east-1.rds.amazonaws.com/matdaan');

const Candidate = sequelize.define('Candidate', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  aadharNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  mobileNumber: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  salt: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM,
    values: ["VOTER", "CANDIDATE", "ADMIN"],
    defaultValue: "CANDIDATE"
  },
  election: {
    type: DataTypes.ENUM,
    values: ['LOKSABHA', 'VIDHANSABHA', 'MUNICIPAL'],
    allowNull: false
  }
}, {
  timestamps: true,
  hooks: {
    beforeSave: (candidate, options) => {
      if (candidate.changed('password')) {
        const salt = randomBytes(16).toString();
        const hashedPassword = createHmac('sha256', salt).update(candidate.password).digest('hex');

        candidate.salt = salt;
        candidate.password = hashedPassword;
      }
    }
  }
});

sequelize.sync()

Candidate.matchPasswordAndGenerateToken = async function(email, password) {
  const candidate = await Candidate.findOne({ where: { email } });
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

Candidate.getUserByEmail = async function(email) {
  const user = await Candidate.findOne({ where: { email } });
  if (!user) {
    throw new Error('Unable to find user');
  }
  return user;
};

module.exports = Candidate;