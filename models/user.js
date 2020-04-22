'use strict';
const {encrypt} = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: 
    {
      allowNull: false,
      type : DataTypes.STRING
    },
    email: 
    {
      allowNull: false,
      unique : true,
      type : DataTypes.STRING,
      validate :
      {
        isEmail : true
      }
    },
    password: 
    {
      allowNull: false,
      type : DataTypes.STRING
    },
    role: 
    {
      allowNull: false,
      type : DataTypes.STRING,
      defaultValue : "user",
      validate :
      {
        isIn : [["admin", "user"]]
      }
    }
  }, {
    hooks :
    {
      beforeCreate : (user, options) =>
      {
        user.password = encrypt(user.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, {through : "Orders"});
  };
  return User;
};