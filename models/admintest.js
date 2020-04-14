'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model}= sequelize.Sequelize
  class Admintest extends Model{}

  Admintest.init({
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
      beforeCreate(admintest,options) {
        admintest.password = encryptPassword(admintest.password)
        admintest.position='admintest'
      }
    }
  })
  Admintest.associate = function(models) {
    Admintest.hasMany(models.Product)
    // associations can be defined here
  };
  return Admintest;
};