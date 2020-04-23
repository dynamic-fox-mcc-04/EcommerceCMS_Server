'use strict';
const { encryptPass } = require('../helpers/bcrypt')
const admins = require('../admin.json')
admins.forEach((el) => {
  el.password = encryptPass(el.password)
  el.role = 'admin'
  el.createdAt = new Date() 
  el.updatedAt = new Date()
});

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', admins, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
