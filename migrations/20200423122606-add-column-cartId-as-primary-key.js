'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Carts', 'CartId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    }, {
      before: 'paid'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Carts', 'CartId');
  }
};
