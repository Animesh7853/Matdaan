const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('mysql://admin:123456789@database-1.cvyicsusmibx.us-east-1.rds.amazonaws.com/matdaan');

const VoterAddress = sequelize.define('VoterAddress', {
  voterId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Voters', // name of your model, not the table name
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

VoterAddress.sync()
  .then(() => console.log('VoterAddress table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occurred', error));

module.exports = VoterAddress;