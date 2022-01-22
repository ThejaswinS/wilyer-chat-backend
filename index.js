const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(express.json());

server.listen(5000, () =>console.log("starting at 5000 port"))



io.on("connection", (socket) => {
  console.log(socket.id + " Socket is connected.");

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User is connected to room.");
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " Socket disconnected");
  });
});
