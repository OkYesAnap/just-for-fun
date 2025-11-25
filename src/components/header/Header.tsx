import React, {useContext, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import InputLabel from "../inputBlock/InputLabel";
import {ChatContext} from "../../context/ChatContext";
import styled from "styled-components";
import {chatPages} from "../../api/params";

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
    useEffect(() => {
        document.title = location || '';
        return () => {
            document.title = "React app";
        }
    }, [location, setMessages]);
    return (<HeaderStyled>
        {Object.keys(chatPages).map(routeParam => {
            const active = routeParam === location;
            return (
                <InputLabel key={routeParam} noBorder={!(active)}>
                    <Link className={`App-link ${active && 'active'}`} to={`/${routeParam}`}>
                        {routeParam}
                    </Link>
                </InputLabel>
            )
        })}
    </HeaderStyled>)
};

export default Header;