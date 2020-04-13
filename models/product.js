'use strict';
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {

    get id() {
      return this.id
    }
    get name() {
      return this.name
    }
    get image_url() {
      return this.image_url
    }
    get price() {
      return this.price
    }
    get userID() {
      return this.userID
    }

  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            args: true,
            msg: 'Name is required field'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            args: true,
            msg: 'Image_url is required field'
        },
        isUrl: {
          args: true,
          msg: 'this field must be url like'
        }   
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
            args: true,
            msg: 'Price is required field'
          },
        greaterThanZero() {
          if (this.price < 0) {
            throw new Error('Price must be greater than 0')
          }
        }
      }
    }
  }, {
    sequelize,
    models: 'Product'
  })

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  };
  return Product;
};