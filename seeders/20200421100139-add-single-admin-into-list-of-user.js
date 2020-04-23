'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'archie@gmail.com',
      password: "$2a$10$E7ttz7NucdoNKwj/.irWV.wSwdFUwOwddj8fmI2DChrloJiU32pCO",
      role : "admin",
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('Users', null, {});
    
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
