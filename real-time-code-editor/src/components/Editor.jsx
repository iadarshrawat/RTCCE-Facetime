import React, { useContext, useEffect} from "react";

import Editor from "@monaco-editor/react";
import { PostContext } from "../context/PostContext";
import { io } from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useSocket } from "../context/SocketProvider";
import { useUnameContext } from "../context/UnameProvider";
import { useRemoteContext } from "../context/RemoteIdProvider";

export const EditorComp = () => {
  const socket = useSocket();
  const { uname, setUname }=useUnameContext();
  const { code, setCode, setJoinedUsers,selectedLanguage } = useContext(PostContext);
  const location = useLocation();
  const params = useParams();
  const { remoteSocketId, setRemoteSocketId } = useRemoteContext();


  const options = {
    selectOnLineNumbers: true,
  };
  const handleChange = async (value, event) => {
    const data = {
      roomId: params.roomId,
      remoteId: remoteSocketId,
      code,
    };
    setCode(value);
    socket.emit("new input", data);
  };

  function handleEditorValidation(markers) {
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }


  useEffect(() => {
    socket.on("input recieved", (data) => {
      setCode(data.code);
    });

    return()=>{
      socket.off("input recieved");
    }
  }, [socket, setCode]);



  return (
    <div className="col-span-2">
      <div className=" block">
        <Editor
          className="editor"
          width="100%"
          height="76vh"
          language={selectedLanguage?.value||"javascript"}
          theme="vs-dark"
          value={code}
          options={options}
          onChange={handleChange}
          onValidate={handleEditorValidation}
        />
      </div>
       <Toaster
    position='top-right'
    toastOptions={{
      duration:2000,
      style:{
         fontSize:15,
         padding:'15px 12px'
      }
    }}
    />
    </div>
  );
};