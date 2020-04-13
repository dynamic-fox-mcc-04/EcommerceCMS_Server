'use strict';
module.exports = (sequelize, DataTypes) => {
  const{Model}= sequelize.Sequelize

  class Product extends Model{}

  Product.init ({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          args:true,
          msg:'Name cannot null'
        },
        notEmpty:{
          args:true,
          msg: 'Please insert name field'
        }
      }
    },
    image_url: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          args:true,
          msg:'Name cannot null'
        },
        notEmpty:{
          args:true,
          msg: 'Please insert image_url field'
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty:{
          args:true,
          msg: 'Please insert image_url field'
        },
        min:{
          args:[0],
          msg:'price cannot be minus'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:'please insert stock quantity'
        },
        min:{
          args:[0],
          msg:'stock cannot be minus'
        }
      }
    }
  },{
    sequelize
  })

  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};