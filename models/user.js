'use strict';
const { encrypt } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Username is required field'
        },
        len: {
          args: [4],
          msg: 'Username length must be at least 4 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required field'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is required field'
        },
        len: {
          args: [6],
          msg: 'Password must be atleast has 6 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate(User, options) {
        if(User.role !== 'admin') {
          User.role = 'customer';
        }
        User.password = encrypt(User.password);
      }
    },
    sequelize,
    modelName: 'User'
  })

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, { through: 'Cart'})
  };
  return User;
};