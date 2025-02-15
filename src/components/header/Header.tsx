import React, {useContext, useEffect} from "react";
import {headerLinks, routeHeader} from "../../utils/constanst";
import {Link, useLocation} from "react-router-dom";
import {contextEngine} from "../../api/gptApi";
import InputLabel from "../inputBlock/InputLabel";
import {ChatContext} from "../../context/ChatContext";

const Header: React.FC = () => {
	const location = useLocation().pathname.slice(1);
	const {setMessages} = useContext(ChatContext);
	const title = routeHeader.find(routeParam => routeParam.route === location)?.title || '';
	const links = routeHeader.filter(routeParam => headerLinks.has(routeParam.route));
	useEffect(() => {
		document.title = title || '';
		return () => {
			document.title = "React app";
			setMessages(contextEngine.clear());
		}
	}, [location]);
	return (<div style={{display: "flex", flexDirection: "row", marginTop: "0.5vh"}}>
		{links.map(routeParam => {
			return (
				<InputLabel key={routeParam.route} noBorder={!(routeParam.title === title)}>
					<Link className="App-link" to={`/${routeParam.route}`}>
						{routeParam.title}
					</Link>
				</InputLabel>
			)
		})}
	</div>)
};

export default Header;