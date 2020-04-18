'use strict';
module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize
    const { generate } = require('../helpers/bcrypt')

    class Admin extends Model {}

    Admin.init({
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

        isAdmin: DataTypes.BOOLEAN
    }, {
        hooks: {
            beforeCreate(Admin, options) {
                Admin.password = generate(User.password)
            }
        },
        sequelize
    });
    Admin.associate = function(models) {
        // associations can be defined here
    };
    return Admin;
};