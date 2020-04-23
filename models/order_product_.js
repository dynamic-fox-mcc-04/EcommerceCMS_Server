'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Order_Product_ extends Model {}

  Order_Product_.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Quantity cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Quantity cannot be empty string'
        },
        min: {
          args: [0],
          msg: 'Quantity cannot be negative'
        }
      }
    },
    OrderId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  },{
    sequelize,
    modelName: 'Order_Product_'
  })
  Order_Product_.associate = function(models) {
    Order_Product_.belongsTo(models.Order)
    Order_Product_.belongsTo(models.Product)
  };
  return Order_Product_;
};