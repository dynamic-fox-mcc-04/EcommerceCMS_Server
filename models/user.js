'use strict';
const { encryptPassword } = require('../helpers/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize.Sequelize.Model {}
    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "username is required"
                },
                notEmpty: {
                    args: true,
                    msg: "username is required"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "email is already exists"
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "email is required"
                },
                notEmpty: {
                    args: true,
                    msg: "email is required"
                },
                isEmail: {
                    args: true,
                    msg: "your email format is wrong"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "password is required"
                },
                notEmpty: {
                    args: true,
                    msg: "password is required"
                },
                len: {
                    args: [6],
                    msg: "Password atleast has 6 characters"
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "role is required"
                },
                notEmpty: {
                    args: true,
                    msg: "role is required"
                },
                isIn: {
                    args: [
                        ['admin', 'customer']
                    ],
                    msg: 'Invalid role'
                }

            }
        }
    }, {
        sequelize,
        hooks: {
            beforeCreate(User, options) {
                User.password = encryptPassword(User.password)
            }
        },
        modelName: 'User'
    })
    User.associate = function(models) {
        // associations can be defined here
        // User.belongsToMany(models.Product, {through: "Carts"})
        User.hasMany(models.Cart, {foreignKey: 'UserId'})
    };
    return User;
};