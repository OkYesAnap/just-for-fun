import React from 'react';
import './App.css';
import {ChatContextProvider} from "./context/ChatContext";
import LoginRoutes from "./components/login/LoginRoutes";
import {AuthContextProvider} from "./context/AuthContext";

function App() {
    return (
        <div className="App">
            <ChatContextProvider>
                <AuthContextProvider>
                    <LoginRoutes/>
                </AuthContextProvider>
            </ChatContextProvider>
        </div>
    );
}

export default App;
