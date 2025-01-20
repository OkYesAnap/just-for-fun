import React from "react";
import {Link} from "react-router-dom";

const Error404 = () => (
    <div>
        <h1>Not Found 404</h1>
        <h2>
            <Link className="App-link" to="/">
                Go to main
            </Link>
        </h2>
    </div>
)

export default Error404