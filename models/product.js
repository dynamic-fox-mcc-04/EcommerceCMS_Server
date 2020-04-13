'use strict';
const notMinus = require('../helpers/notMinus');

module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        },
        validNotMinus() {
          notMinus(this.price)
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        }
      }
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product'
  })

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.User, { through: 'Cart'})
  };
  return Product;
};