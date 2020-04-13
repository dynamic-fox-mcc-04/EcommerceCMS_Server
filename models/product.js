'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {

    }, {});
    class Product extends sequelize.Sequelize.Model {}
    Product.init({
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "product name is required"
                },
                notEmpty: {
                    args: true,
                    msg: "product name is required"
                }

            }
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "image url is required"
                },
                notEmpty: {
                    args: true,
                    msg: "image url is required"
                }

            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "stock is required"
                },
                notEmpty: {
                    args: true,
                    msg: "stock is required"
                }

            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "price is required"
                },
                notEmpty: {
                    args: true,
                    msg: "price is required"
                }

            }
        },
        CategoryId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product'
    })
    Product.associate = function(models) {
        // associations can be defined here
    };
    return Product;
};