import { useCallback, useEffect, useState } from "react";
import { useVideoContext } from "./context/VideoContext";
import { useSocket } from "./context/SocketProvider";
import { useRemoteContext } from "./context/RemoteIdProvider";
import peer from "./service/peer";

const Connection = () => {
  const { myStream, setRemoteStream } = useVideoContext();
  const socket = useSocket();
  const { remoteSocketId, setRemoteSocketId } = useRemoteContext();
  const [shouldCallUser, setShouldCallUser] = useState(false);

  const handleUserJoined = useCallback(({ email, id }) => {
    setRemoteSocketId(id);
    setShouldCallUser(true);
    console.log(email, 'joined room');
  }, [ setRemoteSocketId]);

  const handleCallUser = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
      setTimeout(() => {
        sendStreams();
      }, 100);
    },
    [socket, setRemoteSocketId, sendStreams]
  );


  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setRemoteDescription(ans);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ from, ans }) => {
    setRemoteSocketId(from);
    await peer.setRemoteDescription(ans);
    socket.emit('trigger:sendstream', {to:from});
  }, [socket, setRemoteSocketId]);


  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  useEffect(()=>{
    if(remoteSocketId!==null && shouldCallUser){
      console.log(remoteSocketId);
      handleCallUser();
      setShouldCallUser(false);
    }
  },[shouldCallUser, handleCallUser, remoteSocketId, setShouldCallUser]);

  return 
  <>
  </>;
};

export default Connection;