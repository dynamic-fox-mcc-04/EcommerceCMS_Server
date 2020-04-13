'use strict';
const bcrypt = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
class User extends sequelize.Sequelize.Model{}

User.init({
  email :{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg : "Email required"
      }
    }
  }, 
  password:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg:"Password required"
      }
    }
  } 
},{
  sequelize,
  modelName:"User",
  beforeCreate(user, opt) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
})


  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};