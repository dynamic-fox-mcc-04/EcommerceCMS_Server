'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Status extends Model{}

  Status.init({
    status: {
      type: DataTypes.STRING
    }
  }, {sequelize})

  Status.associate = function(models) {
    // associations can be defined here
  };
  return Status;
};