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
    default:
        
}
console.log(env)
const app = require('../app')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
io.on('connection', function(socket) {
    console.log('A User Connected')

    socket.on('checkoutdone', () => {
        io.emit('updatedata')
    })
    socket.on('login', () => {
        console.log('LOGIN')
    })

    socket.on('disconnect', () => {
        console.log('A User Disconnected')
    })

})


http.listen(process.env.PORT, function() {
    console.log(`listening to port ${process.env.PORT}`)
})
