'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  class CartProduct extends Model { }

  CartProduct.init({
    OrderId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize
  })

  CartProduct.associate = function(models) {
    // associations can be defined here
  };
  return CartProduct;
};