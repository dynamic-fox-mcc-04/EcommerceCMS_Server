'use strict';

// const fs = require("fs")

// const allProductData = JSON.parse(fs.readFileSync("../data/products.json", "utf-8"))
// allProductData.forEach((product) => {
//   product.createdAt = new Date ()
//   product.updatedAt = new Date ()
// });


module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Products', [
      {
          "name": "Bobs Red Mill Gluten Free Old Fashioned Rolled Oats Whole Grain - 907gr",
          "imageUrl": "https://assets.babyzania.com/image/cache/catalog/1/Whole%20grain%20920g-800x800.jpg",
          "price": 169000,
          "stock": 35,
          "createdAt" : new Date (),
          "updatedAt" : new Date ()

      },
      {
          "name": "Bobs Red Mill Organic Quinoa Grain - 737gr",
          "imageUrl": "https://assets.babyzania.com/image/cache/catalog/1/QUINOA-800x800.jpg",
          "price": 279000,
          "stock": 90,
          "createdAt" : new Date (),
          "updatedAt" : new Date ()
      },
      {
          "name": "Bobs Red Mill Organic Tricolor Quinoa Grain - 369gr",
          "imageUrl": "https://assets.babyzania.com/image/cache/catalog/1/6042s136_organic_tricolorquinoa_f_hr_1_1-800x800.jpg",
          "price": 149000,
          "stock": 80,
          "createdAt" : new Date (),
          "updatedAt" : new Date ()
      },
      {
          "name": "Bobs Red Mill Organic Quick Cooking Rolled Oats - 454gr",
          "imageUrl": "https://assets.babyzania.com/image/cache/catalog/1/Rolled%20oats-800x800.jpg",
          "price": 83000,
          "stock": 50,
          "createdAt" : new Date (),
          "updatedAt" : new Date ()
      },
      {
          "name": "Lingkar Organik Beras Organik 1kg - Pandan Wangi",
          "imageUrl": "https://assets.babyzania.com/image/cache/catalog/1/LINGKAR%20ORGANIK-800x800.jpg",
          "price": 25000,
          "stock": 50,
          "createdAt" : new Date (),
          "updatedAt" : new Date ()
      }
  ], {})
    
    
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
