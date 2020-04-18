'use strict';
module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize
    class Product extends Model {}

    Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Product name required.'
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Product image required.'
                }
            }
        },
        description: DataTypes.STRING,
        videourl: DataTypes.STRING,
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Price must not be empty.'
                }
            }
        }
    }, {
        sequelize
    });
    Product.associate = function(models) {
        Product.belongsToMany(models.User, { through: 'UserProducts' })

    };
    return Product;
};