'use strict';

const products = require('../product.json')
products.forEach((el) => {
  el.createdAt = new Date() 
  el.updatedAt = new Date()
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
