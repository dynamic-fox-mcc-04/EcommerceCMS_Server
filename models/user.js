'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: {
     type :  DataTypes.STRING,
     allowNull : false,
     validate : {
       notNull : {
          args : true,
          msg : 'Email required'
       },
       notEmpty : {
         args : true,
         msg : 'Email required'
       },
       isEmail : {
         args : true,
         msg : 'Must be email format'
       }
     }
    },
    password:{
      type : DataTypes.STRING,
      allowNull : false,
        validate : {
          notEmpty : {
            args : true,
            msg : 'Password required'
          },
          notNull : {
            args : true,
            msg : 'Password required'
          }
        }
    }, 
    role: DataTypes.STRING
  }, {
    sequelize,
    validate : {
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Product)
  };
  return User;
};