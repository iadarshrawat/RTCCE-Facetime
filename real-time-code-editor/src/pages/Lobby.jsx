import LobbyContent from "./LobbyComp/LobbyContent";
import { useSocket } from "../context/SocketProvider";
const Lobby = () => {

    const socket = useSocket();

    return (
        <>
        <LobbyContent socket={socket}/>
        </>
    );
  };
  
  export default Lobby;