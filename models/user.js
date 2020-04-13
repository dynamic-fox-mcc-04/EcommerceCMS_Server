'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
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
      }
    },
    password: {
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.INTEGER
    }
  }, {sequelize})

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};