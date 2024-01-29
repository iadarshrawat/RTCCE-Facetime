import { useVideoContext } from "../context/VideoContext";
import ReactPlayer from "react-player";

const VideoScreen=()=>{
    const { myStream, remoteStream } = useVideoContext();
    return(
        <>
        <div className="vscreens">
            {/* Display Local Stream */}
            {myStream && (
              <ReactPlayer
                url={myStream}
                playing
                width="70%"
                height="50%"
                controls
              />
            )}
            {/* Display Remote Stream */}
            {remoteStream && (
              <ReactPlayer
                url={remoteStream}
                playing
                width="70%"
                height="50%"
                controls
              />
            )}
        </div>
        </>
    );
}

export default VideoScreen;