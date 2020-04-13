const env = process.env.NODE_ENV || 'development'

switch (env) {
    case 'test':
        require('dotenv').config({
            path: process.cwd() +'/.env.test'
        })
        break;
    case 'development':
        require('dotenv').config({
            path: process.cwd() + '/.env'
        })
        break;
}

const app = require('../app')
const http = require('http').createServer(app)


http.listen(process.env.PORT, function() {
    console.log(`listening to port ${process.env.PORT}`)
})
