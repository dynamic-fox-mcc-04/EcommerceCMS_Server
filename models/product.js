'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:{
          args: 1,
          msg: 'Title must be at least 1 character in length.'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Minimum price is 1.'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Minimum stock is 0.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(product, options) {
        if(!product.image_url || product.image_url === '') {
          product.image_url = 'https://i.imgur.com/7JLewP8.jpg'
        }
        if(!product.category || product.category === '') {
          product.category = 'item'
        }
      }
    },
    sequelize
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};