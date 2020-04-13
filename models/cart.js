'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {}
  Cart.init({
    paid: DataTypes.BOOLEAN,
    product_qty: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Product quantity should not be less then 1'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Cart'
  })

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User);
    Cart.belongsTo(models.Product);
  };
  return Cart;
};