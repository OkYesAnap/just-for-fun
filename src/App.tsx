import React from 'react';
import './App.css';
import {ChatContextProvider} from "./context/ChatContext";
import LoginRoutes from "./components/login/LoginRoutes";

function App() {
    return (
        <div className="App">
            <ChatContextProvider>
                <LoginRoutes/>
            </ChatContextProvider>
        </div>
    );
}

export default App;
