'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Address extends Model {}

  Address.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING
    }
  }, {sequelize})

  Address.associate = function(models) {
    // associations can be defined here
  };
  return Address;
};