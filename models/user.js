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
        }
    }, {
        hooks: {
            beforeCreate(User, options) {
                User.password = generate(User.password)
            }
        },
        sequelize
    })

    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};