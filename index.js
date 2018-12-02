#!/usr/bin/env node

const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');

const port = 5000;
app.listen(port);

console.log(`listening at port ${port}`);

if (process.argv.includes('dev')) {
  console.log('not running in production');
} else {
  console.log('running in production');
}

function handler(req, res) {
  if (!process.argv.includes('dev')) {
    let filePath = `${__dirname}${req.url}`;
    if (req.url === '/') {
      filePath = `${__dirname}/client/build/index.html`;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  }
}


const {
  JOIN_ROOM,
  SUBMIT_NUMBER,
  SET_ROOM_DATA,
  RESET_ESTIMATES,
} = require('./client/src/constants');

io.on('connection', socket => {
  console.log('socket connected');
});

io.sockets.on('connection', socket => {
  socket.on(JOIN_ROOM, data => {
    const { room, name, } = data;
    socket.custom = {
      name,
    };
    socket.leaveAll();
    socket.join(room, err => {
      emitRoomData(room);
    });
    socket.emit(JOIN_ROOM, { room, name, id: socket.id });
    console.log('socket connecting to ', room);
    io.in(room).clients((err, clients) => {
      console.log(clients.length, 'is/are connected to room', room);
    });
  });
  socket.on(SUBMIT_NUMBER, data => {
    const { room, number, } = data;
    socket.custom.currentVote = number;
    emitRoomData(room);
  });
  socket.on(RESET_ESTIMATES, data => {
    const { room, } = data;
    resetEstimates(room);
  });
  socket.on('disconnect', () => {
    Object.keys(io.sockets.adapter.rooms).forEach(room => {
      emitRoomData(room);
    });
  });
});

function resetEstimates(room) {
  Object.keys(io.sockets.adapter.rooms[room].sockets).forEach(id => {
    if (typeof io.sockets.sockets[id].custom === 'object') {
      io.sockets.sockets[id].custom.currentVote = null;
    }
  });
  emitRoomData(room);
}

function emitRoomData(room) {
  const data = getRoomData(room);
  io.to(room).emit(SET_ROOM_DATA, { data, });
}

function getRoomData(room) {
  const roomData = Object.keys(io.sockets.adapter.rooms[room].sockets).reduce((result, id) => {
    result[id] = io.sockets.sockets[id].custom;
    return result;
  }, {});
  return roomData;
}


// https://stackoverflow.com/questions/10895925/how-to-leave-all-rooms-that-the-socket-is-connected-to-at-one-go-in-node-js