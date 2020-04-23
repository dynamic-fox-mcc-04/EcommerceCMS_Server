'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {
    get id() {
      return this.id
    }
    get productId() {
      return this.productId
    }
    get userId() {
      return this.userId
    }
    get qty() {
      return this.qty
    }
    get total() {
      return this.total
    }
    get status() {
      return this.status
    }
  }
  Cart.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cart'
  })
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User, { foreignKey: 'userId' })
    Cart.belongsTo(models.Product, { foreignKey: 'productId' })
  };
  return Cart;
};