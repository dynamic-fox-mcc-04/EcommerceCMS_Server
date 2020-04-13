'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Banner extends Model{}

  Banner.init({
    banner_name: {
      type: DataTypes.STRING
    },
    description:{
      type: DataTypes.STRING
    },
    image:{
      type: DataTypes.STRING
    }
  }, {sequelize})

  Banner.associate = function(models) {
    // associations can be defined here
  };
  return Banner;
};