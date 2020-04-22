'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    Quantity: {
      type: DataTypes.INTEGER,
      notNull: {
        args: true,
        msg: 'Must be Filled!!'
      },
      validate: {
        min: {
          args: '1',
          msg: 'Must have At Least 1'
        }
      }
    } 
  }, {});
  Cart.associate = function(models) {
    Cart.belongsTo(models.User),
    Cart.belongsTo(models.Product)
    // associations can be defined here
  };
  return Cart;
};