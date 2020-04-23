'use strict';

const fs = require("fs")

const allProductData = JSON.parse(fs.readFileSync("../data/products.json", "utf-8"))
allProductData.forEach((product) => {
  product.createdAt = new Date ()
  product.updatedAt = new Date ()
});


module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Products', allProductData, {})
    
    
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
    return queryInterface.bulkDelete('Products', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
