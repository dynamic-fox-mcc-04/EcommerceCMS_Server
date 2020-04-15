'use strict';
module.exports = (sequelize, DataTypes) => {
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
        imageUrl: DataTypes.STRING,
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
                },
                isStockGreaterThanZero() {
                    if (this.stock < 0) {
                        throw new Error("Stock must be greater than or equal to 0");
                    }
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
                },
                isPriceGreaterThanZero() {
                    if (this.price < 0) {
                        throw new Error("Price must be greater than or equal to 0");
                    }
                }
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "category is required"
                },
                notEmpty: {
                    args: true,
                    msg: "category is required"
                },
                isIn: {
                    args: [
                        ['sneakers', 'boots', 'brogue', 'derby', 'trekking']
                    ],
                    msg: 'Category is not valid'
                }

            }
        }
    }, {
        sequelize,
        hooks: {
            beforeCreate(Product, options) {
                if (!Product.imageUrl) {
                    Product.imageUrl = 'https://discountseries.com/wp-content/uploads/2017/09/default.jpg'
                }
            }
        },
        modelName: 'Product'
    })
    Product.associate = function(models) {
        // associations can be defined here
    };
    return Product;
};