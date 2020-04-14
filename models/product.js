'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Product = sequelize.define('Product', {
  //   name: DataTypes.STRING,
  //   image_url: DataTypes.STRING,
  //   price: DataTypes.INTEGER,
  //   stock: DataTypes.INTEGER,
  //   userId: DataTypes.INTEGER
  // }, {});
  class Product extends sequelize.Sequelize.Model {}

  Product.init({
    name : {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url : {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Product' // We need to choose the model name
  });


  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User)
  };
  return Product;
};