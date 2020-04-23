'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Product extends Model {}

  Product.init({
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    qty: {
      type: DataTypes.INTEGER
    },
    Category: {
      type: DataTypes.STRING
    }
  }, { sequelize })

  Product.associate = function (models) {
    // associations can be defined here
    Product.hasMany(models.Cart,{foreignKey: "ProductId", onDelete: 'cascade'})
  };
  return Product;
};