'use strict';
const { encrypt } = require('../helpers/bcrypt');
const fs = require("fs");
const dataAdmin = JSON.parse(fs.readFileSync('./admin.json','utf8'));
console.log(dataAdmin)

dataAdmin.map(el => {
  el.password = encrypt(el.password)
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', dataAdmin, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
