'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Name cannot be empty string"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Image URL cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Image URL cannot be empty string"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Price cannot be negative'
        },
        notNull: {
          args: true,
          msg: "Price cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Price cannot be empty string"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Stock cannot be negative'
        },
        notNull: {
          args: true,
          msg: "Stock cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Stock cannot be empty string"
        }
      }
    }
  }, {
    sequelize,
    modelName: "Product"
  })
  Product.associate = function(models) {
    Product.belongsTo(models.User)
    Product.hasOne(models.Order_Product_)
  };

  return Product;
};