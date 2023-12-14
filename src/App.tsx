import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import ChatPage from './pages/chatPage';
import Main from './pages/main';

function App() {
    if (window.location.pathname !== "/" && !window.location.pathname.includes("/index.html")) {
        window.location.pathname = "/404.html";
    }
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/gptChat35" element={<ChatPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
