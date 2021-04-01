// const express = require('express');
// const app = express();
const http = require('http').createServer();
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

let currentRoom = '';
let socketId = '';
let users = [];

// app.get('/', (req, res) => {
//   res.send('hello');
// })

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }) => {
    users.push({ id: `${socket.id}`, name });
    socket.join(`${room}`);
    currentRoom = `${room}`;
    console.log(users);
    io.to(room).emit('newUser', name);
    io.emit('Users', users);
  });
  socket.on('sendMessage', ({ message, name }) => {
    io.to(currentRoom).emit('ReceivedMessage', { name, message });
  });
  socket.on('SendPrivateMessage', ({ socketID, message }) => {
    socket.join(`${socketID}`);
    socketId = `${socketID}`;
    io.to(socketId).emit('ReceivedMessage', { name: 'Jose', message });
  });
});

http.listen(( process.env.PORT || 3333), () => {
  console.log('Server Started on Port 3333');
});