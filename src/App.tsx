import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import ChatPage from './pages/chatPage';
import Main from './pages/main';
import Error404 from './pages/error404';
import MazeGame from "./pages/mazeGame";
import params from '../src/api/params'
import params4 from '../src/api/params4'

function App() {
    const {gpt35, mazeGame} = params
    const {gpt4} = params4
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/gpt-chat-3-5" element={<ChatPage {...gpt35}/>}/>
                    <Route path="/gpt-chat-4" element={<ChatPage {...gpt4}/>}/>
                    <Route path="/maze-game" element={<MazeGame {...mazeGame}/>}/>
                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
