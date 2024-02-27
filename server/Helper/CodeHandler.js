const {socketidToEmailMap, emailToSocketIdMap}=require("./RTC_connection");

function handleInput(io, socket){
    socket.on("new input",(data)=>{
        const {roomId, remoteId, code}=data;
        const name=socketidToEmailMap.get(socket.id);
        io.to(remoteId).emit("input recieved", {name:name, code:code});
    })
}
module.exports={handleInput};