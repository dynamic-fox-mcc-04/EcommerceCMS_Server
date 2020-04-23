'use strict';
module.exports = (sequelize, DataTypes) => {
  const{Model}= sequelize.Sequelize

  class Product extends Model{}

  Product.init ({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          args:true,
          msg:'Name cannot null'
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
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty:{
          args:true,
          msg: 'Please insert price field'
        },
        min:{
          args:[0],
          msg:'Price cannot be minus'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Please insert stock quantity'
        },
        min:{
          args:[0],
          msg:'Stock cannot be minus'
        }
      }
    }
  },{
    sequelize
  })

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Admin)
    Product.belongsToMany(models.User, {
      through: "Cart",
      foreignKey: "ProductId"
    })
  };
  return Product;
};