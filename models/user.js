'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model { }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email must be not an empty string'
        }
      }
    }
    ,
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    }
  },
    {
      sequelize,
      modelName: 'User'
    })
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Order)
  };
  return User;
};