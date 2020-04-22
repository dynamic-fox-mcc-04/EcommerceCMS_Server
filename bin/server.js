const env = process.env.NODE_ENV || 'development';

switch (env) {
    case 'development':
        require('dotenv').config({ path: process.cwd() + '/.env' });
        break
    case 'test':
        require('dotenv').config({ path: process.cwd() + '/.env.test' });
        break
}

const app = require('../app');
const http = require('http');
const server = http.createServer(app);
// const { addUser, removeUser, getUser, getUsersInRoom } = require('../routes/users');
// const io = require('socket.io')(server);
// io.on('connect', (socket) => {
//     socket.on('join', ({ name, room }, callback) => {
//         const { error,user } = addUser({ id: socket.id, name, room });

//         if(error) return callback(error);

//         socket.join(user.room);

//         socket.emit('message', { user: 'admin', text: `Hello ${user.name}, welcome to focusbelantara, what can i do for you ?`});
//         socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//         callback();
//     })
// });

// socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     io.to(user.room).emit('message', { user: user.name, text: message });

//     callback();
// });

// socket.on('disconnect', () => {
//     const user = removeUser(socket.id);
//     if(user) {
//         io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.`});
//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
//     }
// })

server.listen(process.env.PORT, () => {
    console.log('you are listening to port', + process.env.PORT);
})