import React from 'react';
import {Link} from "react-router-dom";

interface RouteHeader {
	[key: string]: string;
}

export const routeHeader: RouteHeader = {
	"gpt-chat-3-5": "React specialist",
	"maze-game": "Maze Game",
	"translator": "Translator",
	"testPage": "TestPage"
}

function Main() {
	return (
		<div>
			<header className="App-header">
				Choose option
			</header>
			{Object.keys(routeHeader).map(key=>{
				return (<div key={key}>
					<Link className="App-link" to={`/${key}`}>
						{routeHeader[key]}
					</Link>
				</div>)
			})}
		</div>
	)
}

export default Main;
