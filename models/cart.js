'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model }= sequelize.Sequelize
  class Cart extends Model {}

  Cart.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          args:true,
          msg:'name cannot null'
        },
        notEmpty:{
          args:true,
          msg: 'Please insert name field'
        }
      }
    },
    image_url: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          args:true,
          msg:'image_url cannot null'
        },
        notEmpty:{
          args:true,
          msg: 'Please insert image_url field'
        }
      }
    },
    quantity: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate(cart, options) {
        cart.isPaid = false
      },
      beforeValidate(cart, options) {
        cart.total_price = cart.quantity*cart.price
      }
    }
  })

  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};