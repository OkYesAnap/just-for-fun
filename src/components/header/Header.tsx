import React, {useContext, useEffect} from "react";
import {headerLinks, routeHeader} from "../../utils/constanst";
import {Link, useLocation} from "react-router-dom";
import {contextEngine} from "../../api/gptApi";
import InputLabel from "../inputBlock/InputLabel";
import {ChatContext} from "../../context/ChatContext";
import styled from "styled-components";

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.5vh;
  padding: 5px;
  background-color: #282c34;
  border: white 1px solid;
  border-radius: 10px;
  z-index: 1
`;

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
	}, [location, setMessages, title]);
	return (<HeaderStyled>
		{links.map(routeParam => {
			const active = routeParam.title === title;
			return (
				<InputLabel key={routeParam.route} noBorder={!(active)}>
					<Link className={`App-link ${active && 'active'}`} to={`/${routeParam.route}`}>
						{routeParam.title}
					</Link>
				</InputLabel>
			)
		})}
	</HeaderStyled>)
};

export default Header;