import React from 'react';
import {Link} from "react-router-dom";
import {routeHeader} from "../utils/constants";

function Main() {
	return (
		<div>
			<header className="App-header">
				Choose option
			</header>
			{routeHeader.map(routeParam => {
				return (<div key={routeParam.route}>
					<Link className="App-link" to={`/${routeParam.route}`}>
						{routeParam.route}
					</Link>
				</div>)
			})}
		</div>
	)
}

export default Main;
