import React from 'react';
import {Link} from "react-router-dom";

function Main() {
    return (
        <header className="App-header">
            <Link className="App-link" to="/gptChat35">
                Go to chat
            </Link>
        </header>
    );
}

export default Main;
