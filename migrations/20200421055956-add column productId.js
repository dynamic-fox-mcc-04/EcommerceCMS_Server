'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Carts','ProductId',Sequelize.INTEGER)
      .then(() => queryInterface.addConstraint('Carts',['ProductId'], {
        type: 'foreign key',
        name: 'custom_fkey_ProductId',
        references: {
          table: 'Products',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }))
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Carts','ProductId')
      .then(()=> queryInterface.removeConstraint('Carts','custom_fkey_ProductId'))
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
