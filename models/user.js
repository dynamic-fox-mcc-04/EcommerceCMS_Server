'use strict';
module.exports = (sequelize, DataTypes) => {
  const { hashPassword } =  require('../helpers/bcrypt')
  class User extends sequelize.Sequelize.Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email is already in use"
      },
      validate: {
        len: {
          args: 3,
          msg: "Email must be at least 3 characters long."
        },
        isEmail: {
          args: true,
          msg: 'Must use valid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 16],
          msg: "Password must be between 6-16 characters."
        }
      }
    },
    role: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPassword(user.password)
        if(!user.role || user.role === '') {
          user.role = 'buyer'
        }
      }
    },
    sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};