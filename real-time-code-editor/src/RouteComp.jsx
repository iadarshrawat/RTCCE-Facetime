import { Route, Routes } from 'react-router-dom';
import Lobby from './pages/Lobby';
import Room from './pages/Room';
import Login from './pages/Login';
const RouteComp = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Lobby/>} />
                <Route path="/:roomId" element={<Room/>} />
            </Routes>
        </>
    );
}

export default RouteComp;