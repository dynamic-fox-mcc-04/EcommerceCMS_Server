'use strict';

const users = require('../admin.json')

users.forEach(element => {
    element.createdAt = new Date()
    element.updatedAt = new Date()
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
