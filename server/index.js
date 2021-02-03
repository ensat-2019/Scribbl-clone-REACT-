
const express = require('express');
const socketio = require('socket.io');
const http = require('http');


const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');



const PORT = process.env.PORT || 5000;

const router = require('./router');


const app = express();
const SERVER = http.createServer(app);
const io = socketio(SERVER);

io.on('connection', (socket) => {


  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id:socket.id, name, room });    // return only one thing if there is an error or of there is a new user
    if (error){ 
      return callback(error) 
    }

 

    

    // emitting events from the backend to th front end 
    socket.emit('message', { user: 'admin ', text: `${user.name} , Welcome to the room ${user.room} ` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin ', text: `${user.name} ,has joined ! ` });
    socket.join(user.room);
    io.to(user.room).emit('roomData',{room:user.room, users:getUsersInRoom(user.room)})
    io.to(user.room).emit('UsersData',{room:user.room,users:getUser(socket.id)})

    callback();
  });



  // expect the event on the backend  and transfer to front end 
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room:user.room, users:getUsersInRoom(user.room) });
    io.to(user.room).emit('UsersData', { user: user.name,users:getUser(socket.id) });

    callback();
  });


  socket.on('disconnect', () => {
    const user=removeUser(socket.id);
    console.log('works good !');
    if(user){
      io.to(user.room).emit('message',{ user  :'admin' ,text :`${user.name} has left !`})
      
    }
  })
}); 


app.use(router);

SERVER.listen(PORT, () =>
  console.log('Server has started on port ' + PORT)
);