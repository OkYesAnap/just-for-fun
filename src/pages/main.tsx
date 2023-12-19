import React from 'react';
import {Link} from "react-router-dom";

function Main() {
    return (
        <header className="App-header">
            <Link className="App-link" to="/gpt-chat-3-5">
                Go to chat
            </Link>
            <Link className="App-link" to="/maze-game">
                Go to Maze
            </Link>
        </header>
    );
}

export default Main;
