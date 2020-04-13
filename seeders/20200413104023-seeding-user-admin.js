'use strict';
const { encryptPassword } = require('../helpers/bcrypt.js')
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            username: "renata",
            email: "admin@gmail.com",
            password: encryptPassword('12341234'),
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};