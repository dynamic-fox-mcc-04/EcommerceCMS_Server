'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model { }
  Cart.init({
    // attributes
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId is required'
        },
        notNull: {
          args: true,
          msg: 'UserId is required'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'ProductId is required'
        },
        notNull: {
          args: true,
          msg: 'ProductId is required'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'quantity is required'
        },
        notNull: {
          args: true,
          msg: 'quantity is required'
        },
        min: {
          args: [0],
          msg: 'min. quantity is 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart'
  })
  Cart.associate = function (models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};