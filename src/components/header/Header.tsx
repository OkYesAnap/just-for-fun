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
    const location = useLocation();
    const currentLocation = location.pathname.slice(1);
    const {engine, model, setChatName} = useContext(ChatContext);

    useEffect(() => {
        document.title = currentLocation || '';
        setChatName(currentLocation);
        return () => {
            document.title = "Choose AI";
        }
    }, [currentLocation, setChatName]);

    const chatPagesKeys = Object.keys(chatPages);

    return (<HeaderStyled>
        {chatPagesKeys.map(routeParam => {
            const active = routeParam === currentLocation;
            return (
                <InputLabel key={routeParam} noBorder={!(active)}>
                    <Link className={`App-link ${active && 'active'}`}
                          to={{pathname: `/${routeParam}`, search: `engine=${engine}&model=${model}`}}>
                        {routeParam}
                    </Link>
                </InputLabel>
            )
        })}
    </HeaderStyled>)
};

export default Header;