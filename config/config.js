const env = process.env.NODE_ENV || 'development'

switch (env) {
    case 'development' :
        require('dotenv').config({
            path: process.cwd() + '/.env'
        })
        break;
    case 'test':
        require('dotenv').config({
            path: process.cwd() +'/.env.test'
        })
        break;
    default:
        require('dotenv').config({
            path: process.cwd() + '/.env'
        })
        break;
}


module.exports = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
}