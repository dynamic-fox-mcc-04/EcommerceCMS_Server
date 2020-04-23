'use strict';
const { hashPassword } = require("../helpers/bcrypt.js")

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model {}

  User.init({
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          args: true,
          msg: "Email cannot be empty"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        notEmpty: {
          args: true,
          msg:"Email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password cannot be empty"
        },
        notEmpty: {
          args: true,
          msg:"Password cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"user"
    }
  }, {
    hooks:{
      beforeCreate: (user, options) => {
        if(!user.role){
          user.role = "user"
        }
      },
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    },
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, {through: models.ShoppingCart})
    
  };
  return User;
};