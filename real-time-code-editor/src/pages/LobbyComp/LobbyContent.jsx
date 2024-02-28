// Lobby.js
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uid } from 'uuid'
import { useVideoContext } from '../../context/VideoContext';
import ReactPlayer from 'react-player';
import { useUnameContext } from '../../context/UnameProvider';
import './style.css';

const LobbyContent = ({ socket }) => {
    const navigate = useNavigate();
    const { myStream, setMyStream } = useVideoContext();
    const [email, setEmail] = useState('');
    const { uname, setUname } = useUnameContext();
    const [roomId, setRoomId] = useState('');
    const [micEnabled, setMicEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);

    // const videoRef = useRef(null);
    const handleJoinRoom = useCallback(
        (data) => {
            const { email, roomId } = data;
            setUname(email);
            navigate(`/${roomId}`);
        },
        [navigate, setUname]
    );

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        const getUserMediaAndSetStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setMyStream(stream);
            } catch (error) {
                console.error('Error getting user media:', error);
            }
        };

        getUserMediaAndSetStream();

        return () => {
            socket.off("room:join", handleJoinRoom);
        };
    }, [setMyStream, socket, handleJoinRoom]);


    const generateUuid = () => {
        setRoomId(uid);
    }

    const formSubmit = useCallback(
        (e) => {
            e.preventDefault();
            socket.emit("room:join", { email, roomId });
        },
        [email, roomId, socket]
    );

    const handleToggleMic = () => {
        // Toggle mic state
        let audioTrack = myStream.getTracks().find(track => track.kind === 'audio');
        audioTrack.enabled = !audioTrack.enabled;
        setMicEnabled(!micEnabled);
    };

    const handleToggleVideo = () => {
        let videoTrack = myStream.getTracks().find(track => track.kind === 'video');
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(!videoEnabled);
    };


    return (
        <div className='Lobby'>
            <div className="container1">
                <ReactPlayer
                    className="react-player"
                    url={myStream}
                    playing
                    muted
                    width="100%"
                    height="auto"
                />
                <div className='control-btn1'>
                    <button onClick={handleToggleMic}>
                        {micEnabled ? 'Disable Mic' : 'Enable Mic'}
                    </button>
                    <button onClick={handleToggleVideo} >
                        {videoEnabled ? 'Disable Video' : 'Enable Video'}
                    </button>
                </div>
            </div>
            <div className='container2'>
                <h2>JOIN ROOM</h2>
                <form onSubmit={formSubmit}>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
                    <label>Room ID:</label>
                    <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder='Enter room_id' />

                    <div className="flex items-start">

                        <p
                            onClick={generateUuid}
                            className="ml-auto text-xl text-blue-700 hover:underline dark:text-blue-500 font-semibold cursor-pointer"
                        >
                            Generate RoomId
                        </p>
                    </div>
                    <button type='submit' disabled={!email ||!roomId}>
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LobbyContent;