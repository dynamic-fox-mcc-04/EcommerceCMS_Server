'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    Name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Item Already Exist'
      },
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    Image_Url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    } ,
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        min: {
          args: -1,
          msg: 'Must At Least 0 For Price'
        }
      }
    } ,
    Stock: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: false,
        notNull: false,
        min: {
          args: -1,
          msg: 'Must At Least 0 For Stock'
        }
      }
    } 
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.Order),
    Product.hasMany(models.Cart)
    // associations can be defined here
  };
  return Product;
};