'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model { }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `The name of products is required`
        },
        notEmpty: {
          msg: `The name of products must not be an empty string`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `The image_url is required`
        },
        notEmpty: {
          msg: `The image_url must not be an empty string`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `price is required`
        },
        min: {
          args: 2000,
          msg: 'price muste be IDR 2000 or higher'
        }
      }
    },
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product'
  })
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};