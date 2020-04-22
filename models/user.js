'use strict';
const encrypt = require('../helper/encrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Must Be Filled in Email Format'
        },
        notNull: {
          args: true,
          msg: 'Does Not Accept Null Value'
        },
        notEmpty: {
          args: true,
          msg: 'Do Not Leave Blanks'
        }
      }
    } ,
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Does Not Accept Null Value'
        },
        notEmpty: {
          args: true,
          msg: 'Do Not Leave Blanks'
        }
      }
    } ,
    Role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.Password = encrypt(user.Password)
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Order),
    User.hasMany(models.Cart)
    // associations can be defined here
  };
  return User;
};