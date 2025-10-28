import styled from "styled-components";
import {IEngineMessage} from "../../api/gptApi";
import Message from "./Message";
import React, {useContext, useEffect, useRef} from "react";
import {ChatContext} from "../../context/ChatContext";

const MessagesBlockStyled = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    scroll-behavior: smooth;
    align-items: end;
`;

const MessagesMargins = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5% 0 20%;
`

const MessagesBlock: React.FC = () => {
    const chatBlockRef = useRef<HTMLDivElement>(null);
    const {messages} = useContext(ChatContext);
    useEffect(() => {
        if (chatBlockRef?.current) {
            chatBlockRef.current.scrollTop = chatBlockRef.current.scrollHeight;
        }
    }, [messages]);

    return (<MessagesBlockStyled ref={chatBlockRef}>
        <MessagesMargins>
            {messages.map((message: IEngineMessage, i) => {
                return <Message key={i} {...{i, message}}/>
            })}
        </MessagesMargins>
    </MessagesBlockStyled>)
};

export default MessagesBlock;