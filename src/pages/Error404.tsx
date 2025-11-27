import React from "react";
import {Link} from "react-router-dom";
import {chatPages} from "../api/params";

const firstPage = Object.keys(chatPages)[0];
const Error404 = () => (
    <div>
        <h1>Not Found 404</h1>
        <h2>
            <Link className="App-link" to={`/${firstPage}`}>
                Go to {firstPage}
            </Link>
        </h2>
    </div>
)

export default Error404