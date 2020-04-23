'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Order extends Model {}

  Order.init({
    checkout_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Checkout Status cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Checkout Status cannot be empty string'
        }
      }
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Total Quantity cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Total Quantity cannot be empty string'
        },
        min: {
          args: [0],
          msg: 'Total Quantity cannot be negative'
        }
      }
    },
    total_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Total Product cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Total Product cannot be empty string'
        },
        min: {
          args: [0],
          msg: 'Total Product cannot be negative'
        }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Total Quantity cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Total Quantity cannot be empty string'
        },
        min: {
          args: [0],
          msg: 'Total Quantity cannot be negative'
        }
      }
    },
    UserId: DataTypes.INTEGER
  },{
    sequelize,
    modelName: 'Order'
  })

  Order.associate = function(models) {
    Order.belongsTo(models.User)
    Order.hasMany(models.Order_Product_)
  };
  return Order;
};