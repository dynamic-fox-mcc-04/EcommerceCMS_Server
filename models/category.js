'use strict';
module.exports = (sequelize, DataTypes) => {
    class Category extends sequelize.Sequelize.Model {}
    Category.init({
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "category name is required"
                },
                notEmpty: {
                    args: true,
                    msg: "category name is required"
                }

            }
        }
    }, {
        sequelize,
        modelName: 'Category'
    })
    Category.associate = function(models) {
        // associations can be defined here
    };
    return Category;
};