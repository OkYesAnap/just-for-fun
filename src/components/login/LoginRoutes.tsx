import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import ChatPage from "../../pages/ChatPage";
import params, {chatPages} from "../../api/params";
import Main from "../../pages/Main";
import MazeGame from "../../pages/MazeGame";
import TestPage from "../../pages/TestPage";
import Error404 from "../../pages/Error404";
import React from "react";
import params4 from "../../api/params4";
import useAuth from "../../hooks/useAuth";

const LoginRoutes = () => {
    const {mazeGame} = params;
    const {gpt4} = params4;
    const pages = Object.entries(chatPages);
    const authUser = useAuth();
    const {isAuthenticated} = authUser;
    return (
        <BrowserRouter>
            {<GoogleLogin {...{authUser}} />}
            {isAuthenticated && <Routes>
                {pages.map(([key, value]) => (
                    <Route key={key} path={`/${key}`} element={<ChatPage {...{...value, chatName: key}}/>}/>
                ))}
                <Route path="/gpt-chat-4" element={<ChatPage {...{...gpt4, chatName: 'gpt-chat-4'}}/>}/>
                <Route path="/" element={<Navigate to={Object.keys(chatPages)[0]}/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/maze-game" element={<MazeGame {...mazeGame}/>}/>
                <Route path="/testPage" element={<TestPage/>}/>
                <Route path="*" element={<Error404/>}/>
            </Routes>}

        </BrowserRouter>)
}
export default LoginRoutes;