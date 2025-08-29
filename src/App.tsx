import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
import Main from './pages/Main';
import Error404 from './pages/Error404';
import MazeGame from "./pages/MazeGame";
import TestPage from "./pages/TestPage"
import params from '../src/api/params'
import {ChatContextProvider} from "./context/ChatContext";

// import params4 from '../src/api/params4'

function App() {
    const {chatEngine, mazeGame, translator} = params
    // const {gpt4} = params4
    return (
        <div className="App">
            <ChatContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/chat-engine"/>}/>
                        <Route path="/main" element={<Main/>}/>
                        <Route path="/chat-engine" element={<ChatPage {...chatEngine}/>}/>
                        {/*<Route path="/gpt-chat-4" element={<ChatPage {...gpt4}/>}/>*/}
                        <Route path="/maze-game" element={<MazeGame {...mazeGame}/>}/>
                        <Route path="/translator" element={<ChatPage {...translator}/>}/>
                        <Route path="/testPage" element={<TestPage/>}/>
                        <Route path="*" element={<Error404/>}/>
                    </Routes>
                </BrowserRouter>
            </ChatContextProvider>
        </div>
    );
}

export default App;
