function handleInput(io, socket){
    socket.on("new input",(data)=>{
        const {roomId, name, code}=data;
        io.to(roomId).emit("input recieved", {name:name, code:code});
    })
}
module.exports={handleInput};