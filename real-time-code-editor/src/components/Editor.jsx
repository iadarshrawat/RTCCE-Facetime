import React, { useContext, useEffect} from "react";

import Editor from "@monaco-editor/react";
import { PostContext } from "../context/PostContext";
import { io } from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useSocket } from "../context/SocketProvider";
import { useUnameContext } from "../context/UnameProvider";

export const EditorComp = () => {
  const socket = useSocket();
  const { uname, setUname }=useUnameContext();
  const { code, setCode, setJoinedUsers,selectedLanguage } = useContext(PostContext);
  const location = useLocation();
  const params = useParams();

  const options = {
    selectOnLineNumbers: true,
  };

  const handleChange = (value, event) => {
    setCode(value);
  };

  function handleEditorValidation(markers) {
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  useEffect(() => {
    const data = {
      name: location.state,
      roomId: params.roomId,
    };
    socket.emit("setup", { data });
  }, []);

  useEffect(() => {
    socket.emit("join room", {
      uuid: params.roomId,
      name: location.state,
    });
  }, [params.roomId]);



  useEffect(() => {
    socket.on("joined", (data) => {
      const { clients } = data;
    const activeUsers=[]
      clients?.filter((client) => {
        if (client.name !== uname) {
          activeUsers.push(client);
          toast.success(`${client?.name} joined`);
          setJoinedUsers(activeUsers);
        
        }
      });
    
    });
  });




  useEffect(() => {
    const data = {
      roomId: params.roomId,
      name: uname,
      code,
    };
    socket.emit("new input", data);
  }, [code]);

  useEffect(() => {
    socket.on("input recieved", (data) => {
      console.log("recieved");
      console.log("triggered");
      setCode(data.code);
    });
  }, [socket]);



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
          defaultValue={code}
          
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
