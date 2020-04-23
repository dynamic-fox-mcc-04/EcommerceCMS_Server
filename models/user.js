'use strict';
module.exports = (sequelize, DataTypes) => {
    const { generate } = require('../helpers/bcrypt')

    const { Model } = sequelize.Sequelize

    class User extends Model {}

    User.init({
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Email required.'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Password Required.'
                },
                len: {
                    args: [4, 18],
                    msg: 'Password length must between 4 or 18 Characters.'
                }
            }
        },
        balance: {
            type: DataTypes.INTEGER
        }
    }, {
        hooks: {
            beforeCreate(User, options) {
                User.password = generate(User.password)
                User.balance = 0
            }
        },
        sequelize
    })

    User.associate = function(models) {
        User.belongsToMany(models.Product, { through: 'UserProducts', as: 'user', foreignKey: 'userId' })
    };
    return User;
};