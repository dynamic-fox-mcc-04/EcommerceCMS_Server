'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
        {
            email: 'admin@ecommerce.com',
            password: hashPassword('mushroom'),
            role: 'superadmin',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
