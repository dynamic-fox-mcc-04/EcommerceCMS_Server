'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    UserId: 
    {
      allowNull: false,
      type : DataTypes.INTEGER
    },
    ProductId: 
    {
      allowNull: false,
      type : DataTypes.INTEGER
    }
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User);
    Order.belongsTo(models.Product);
  };
  return Order;
};