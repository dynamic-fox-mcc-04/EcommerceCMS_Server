'use strict';
const data = 
[
  {
    "id": 1,
    "username": "test1",
    "email": "test1@gmail.com",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "id": 2,
    "username": "test2",
    "email": "test2@gmail.com",
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
