'use strict';

const {encodePassword} = require('../helper/bcyript.js')
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        isUnik(email, done){
          User.findOne({
            where:{
              email
            }
          })
            .done((result)=>{
              if(result){
                done(new Error('Emial alerdy taken'))
              }
              done()
            })
        }
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          args: true,
          msg: 'Email is required'
        },
      }
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encodePassword(user.password);
        user.level = 2
      }
    },
    sequelize})

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};