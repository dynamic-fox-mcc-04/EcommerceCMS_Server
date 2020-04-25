'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'quantity cannot less than 1'
        }
      }
    },
    totalPrice: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN,
    isSent: DataTypes.BOOLEAN
  }, {
    sequelize,
    hooks: {
      beforeCreate(Cart, options) {
        Cart.isPaid = false
        Cart.isSent = false
      }
    },
    modelName: 'Cart'
  })
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Product, {foreignKey: 'ProductId'})
    Cart.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Cart;
};