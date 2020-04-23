'use strict';
module.exports = (sequelize, DataTypes) => {

  class ShoppingCart extends sequelize.Sequelize.Model {}

  ShoppingCart.init({
    // Model attributes are defined here
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'ShoppingCart' // We need to choose the model name
  });

  ShoppingCart.associate = function(models) {
    // associations can be defined here
    ShoppingCart.belongsTo(models.User, {foreignKey: 'UserId'})
    ShoppingCart.belongsTo(models.Product, {foreignKey: 'ProductId'})
  };
  return ShoppingCart;
};