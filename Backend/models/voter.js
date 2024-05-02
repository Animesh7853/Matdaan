const { Sequelize, DataTypes } = require('sequelize');
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser, validateToken } = require('../services/authentication'); 

const sequelize = new Sequelize('mysql://admin:123456789@maatdaan.cj6c4ei20lt1.us-east-1.rds.amazonaws.com/matdaan_final');

const Voter = sequelize.define('Voter', {
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
    defaultValue: "VOTER"
  }
}, {
  timestamps: true,
  hooks: {
    beforeSave: (voter, options) => {
      if (voter.changed('password')) {
        const salt = randomBytes(16).toString();
        const hashedPassword = createHmac('sha256', salt).update(voter.password).digest('hex');

        voter.salt = salt;
        voter.password = hashedPassword;
      }
    }
  }
});

sequelize.sync()
  .then(() => {
    console.log('Voters table has been successfully created, if one doesn\'t exist');
  })
  .catch((error) => {
    console.log('This error occurred', error);
  });

Voter.matchPasswordAndGenerateToken = async function(email, password) {
  const voter = await Voter.findOne({ where: { email } });
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

Voter.getUserByEmail = async function(email) {
  const user = await Voter.findOne({ where: { email } });
  if (!user) {
    throw new Error('Unable to find user');
  }
  return user;
};

module.exports = Voter;
