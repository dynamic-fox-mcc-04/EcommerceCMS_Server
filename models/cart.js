'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}
  Cart.init({
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'ProductId cannot be empty.'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'UserId cannot be empty.'
      }
    },
    amount: DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: false,
        msg: 'Status cannot be empty.'
      }
    }
  }, {
    hooks: {
      beforeCreate (cart, options) {
        if(!cart.amount || cart.amount < 1) {
          cart.amount = 1
        }
      }
    },
    sequelize
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
    // associations can be defined here
  };
  return Cart;
};