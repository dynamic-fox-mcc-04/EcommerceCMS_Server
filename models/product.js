'use strict';
module.exports = (sequelize, DataTypes) => {

  class Product extends sequelize.Sequelize.Model {}

  Product.init({
    // Model attributes are defined here
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          args: true,
          msg: "Product name cannot be empty"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue : "https://media.istockphoto.com/vectors/silhouette-security-stroller-with-baby-child-inside-vector-id801488358"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull: {
          args: true,
          msg: "Product price must be defined"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull: {
          args: true,
          msg: "Product stock must be defined"
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Other model options go here
    hooks:{
      beforeCreate: (product, options) => {
        if(!product.imageUrl){
          product.imageUrl = "https://media.istockphoto.com/vectors/silhouette-security-stroller-with-baby-child-inside-vector-id801488358"
        }
      }
    },
    sequelize, // We need to pass the connection instance
    modelName: 'Product' // We need to choose the model name
  });

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.User, {through: models.ShoppingCart})

  };
  return Product;
};