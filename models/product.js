'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model { }
  Product.init({
    // attributes
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is required'
        },
        notNull: {
          args: true,
          msg: 'Name is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        min: {
          args: [0],
          msg: 'min. price value is 0'
        }
      }
    },
    image_Url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image url is required'
        },
        notNull: {
          args: true,
          msg: 'Image url is required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock is required'
        },
        notNull: {
          args: true,
          msg: 'Stock is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Product'
    // options
  })
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User)
  };
  return Product;
};