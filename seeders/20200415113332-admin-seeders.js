'use strict';
let admin = [{
  email: 'bayuaslamaa@gmail.com',
  password: '$2y$10$zhS6Qa5BSdZnkAeh0fTJIuX52Qg/ThpDJPCags33Cqc1Dweg00sae',
  createdAt: new Date(),
  updatedAt: new Date()
}]
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', admin, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
