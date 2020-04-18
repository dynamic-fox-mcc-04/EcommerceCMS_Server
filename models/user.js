'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { encryptPass } = require('../helpers/bcrypt')

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty string"
        },
        isEmail: {
          args: false,
          msg: "Please enter correct email format"
        }
      },
      unique: {
        args: true,
        msg: "Email already exists"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Password cannot be empty string"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate(user, options) {
        user.password = encryptPass(user.password)
      }
    }
  })
  
  User.associate = function(models) {
    User.hasMany(models.Product)
  };
  return User;
};