'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Order extends Model { }

  Order.init({
    status: DataTypes.BOOLEAN,
    total: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    hooks: {
      beforeCreate: (order, options) => {
        order.status = false
      }
    }
  })

  Order.associate = function(models) {
    Order.belongsTo(models.Customer)
    Order.belongsToMany(models.Product, {through: 'CartProducts'})
  };
  return Order;
};