// const env = process.env.NODE_ENV || 'development';

// switch (env) {
//     case 'development':
//         require('dotenv').config({ path: process.cwd() + '/.env' });
//         break;
//     case 'test':
//         require('dotenv').config({ path: process.cwd() + '/.env.test' });
//         break;
// }


const app = require('../app.js');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server)

io.on('connection', function(socket) {
    socket.broadcast.emit('markicabs')
    console.log(`new user has connected`)
    io.emit('connect', 'connected')
    socket.on('checkout', () => {
        console.log(`somebody checkout`)
        io.emit('pleaseFetch')
    })
    // socket.on('updatePut', () => {
    //     io.emit('updatePutMention')
    // })
    // socket.on('updatePatch', () => {
    //     io.emit('updatePatchMention')
    // })
    // socket.on('delete', () => {
    //     io.emit('deleteMention')
    // })

    socket.on('disconnect', () => {
        console.log(`user dc`)
    })
})

server.listen(process.env.PORT, () => {
    console.log(`listening on port : ${process.env.PORT}`);
})