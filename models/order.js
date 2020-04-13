'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Order extends Model {}

  Order.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.INTEGER
    },
    AddressId: {
      type: DataTypes.INTEGER
    },
    qty: {
      type: DataTypes.INTEGER
    },
    StatusId: {
      type: DataTypes.INTEGER
    }
  }, {sequelize})

  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};