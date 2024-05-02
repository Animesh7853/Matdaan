const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('mysql://admin:123456789@database-1.cvyicsusmibx.us-east-1.rds.amazonaws.com/matdaan');

const Vote = sequelize.define('Vote', {
  voterId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Voters', // name of your model, not the table name
      key: 'id',
    },
    allowNull: false
  },
  candidateId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Candidates', // name of your model, not the table name
      key: 'id',
    },
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  election: {
    type: DataTypes.ENUM,
    values: ['LOKSABHA', 'VIDHANSABHA', 'MUNICIPAL'],
    allowNull: false
  }
}, {
  timestamps: true
});

Vote.sync();

module.exports = Vote;