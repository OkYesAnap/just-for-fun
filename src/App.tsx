import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
import Main from './pages/Main';
import Error404 from './pages/Error404';
import MazeGame from "./pages/MazeGame";
import TestPage from "./pages/TestPage"
import params, {chatPages} from '../src/api/params'
import {ChatContextProvider} from "./context/ChatContext";

// import params4 from '../src/api/params4'

function App() {
    const {mazeGame} = params;
    // const {gpt4} = params4;

    const pages = Object.entries(chatPages);

    return (
        <div className="App">
            <ChatContextProvider>
                <BrowserRouter>
                    <Routes>
                        {pages.map(([key, value]) => (
                            <Route key={key} path={`/${key}`} element={<ChatPage {...value}/>}/>
                        ))}
                        {/*<Route path="/gpt-chat-4" element={<ChatPage {...gpt4}/>}/>*/}
                        <Route path="/" element={<Navigate to={Object.keys(chatPages)[0]}/>}/>
                        <Route path="/main" element={<Main/>}/>
                        <Route path="/maze-game" element={<MazeGame {...mazeGame}/>}/>
                        <Route path="/testPage" element={<TestPage/>}/>
                        <Route path="*" element={<Error404/>}/>
                    </Routes>
                </BrowserRouter>
            </ChatContextProvider>
        </div>
    );
}

export default App;
