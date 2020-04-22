'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    Quantity: DataTypes.INTEGER,
    TotalPrice: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User),
    Order.belongsTo(models.Product)
    // associations can be defined here
  };
  return Order;
};