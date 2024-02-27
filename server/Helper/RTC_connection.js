const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

function handleRoomJoin(io, socket) {
  socket.on("room:join", (data) => {
    const { email, roomId } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(roomId).emit("user:joined", { email, id: socket.id });
    socket.join(roomId);
    io.to(socket.id).emit("room:join", data);
  });
}

function handleUserCall(io, socket) {
  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });
}

function handleCallAccepted(io, socket) {
  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });
}

function handlePeerNegoNeeded(io, socket) {
  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });
}

function handlePeerNegoDone(io, socket) {
  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
}

module.exports = {
  handleRoomJoin,
  handleUserCall,
  handleCallAccepted,
  handlePeerNegoNeeded,
  handlePeerNegoDone,
  emailToSocketIdMap,
  socketidToEmailMap
};