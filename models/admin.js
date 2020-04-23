'use strict';
const{encryptPassword}= require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const {Model}= sequelize.Sequelize
  class Admin extends Model{}

  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          args:true,
          msg:'please fulfill email field'
        },
        notEmpty: {
          args: true,
          msg: 'please fulfill email field'
        },
        isEmail: {
          args:true,
          msg:'invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'please insert password'
        },
        notEmpty: {
          args: true,
          msg: 'please insert password'
        }
      }
    },
    position: DataTypes.STRING
  },{
    sequelize,
    hooks:{
      beforeCreate(admin,options) {
        admin.password = encryptPassword(admin.password)
        admin.position='admin'
      }
    }
  })
  Admin.associate = function(models) {
    Admin.hasMany(models.Product)
    // associations can be defined here
  };
  return Admin;
};