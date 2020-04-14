'use strict';
const data = [
  {
    "name": "Nike Air Jordan 1 Low",
    "image_url":"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/jk6pwv5o9uos8n2ruecy/air-jordan-1-low-shoe-6Q1tFM.jpg",
    "price": 1429000,
    "stock": 50,
    "category": "Men",
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
