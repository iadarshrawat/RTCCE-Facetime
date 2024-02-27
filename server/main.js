// server.js
const { Server } = require("socket.io");
const { handleRoomJoin, handleUserCall, handleCallAccepted, 
  handlePeerNegoNeeded, handlePeerNegoDone} = require("./Helper/RTC_connection");
const {handleInput} = require("./Helper/CodeHandler");
const io = new Server(8000, {
  cors: true,
});

io.on("connection", (socket) => {
  // code for handling RTC connection
  handleRoomJoin(io, socket);
  handleUserCall(io, socket);
  handleCallAccepted(io, socket);
  handlePeerNegoNeeded(io, socket);
  handlePeerNegoDone(io, socket);

  
  handleInput(io, socket);
});