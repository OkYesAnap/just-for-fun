import {EngineRole} from "../../api/gptApi";
import React, {useRef} from "react";
import styled from 'styled-components';
import MarkdownRenderer from "./MarkdownRenderer";
import {MessageProps} from "./models";
import MessageHeader from "./MessageHeader";


const setBackgroundColor = ($role: EngineRole) => {
    if ($role === EngineRole.user) {
        return "#414158";
    } else if ($role === EngineRole.error) {
        return "red";
    }
    return 'rgba(0, 0, 0, 0)'
}

interface MessageBlockStyledProps {
    $role: EngineRole;
    $engine?: string;
}

export const MessageBlockStyled = styled.div<MessageBlockStyledProps>`
    margin: ${({$role}) => ($role === 'user' ? '10px 10vmin 10px 20px' : '10px auto 10px 10vmin')};
    text-align: left;
    align-self: flex-end;
    width: fit-content;
    background-color: ${({$role}) => setBackgroundColor($role)};
    padding: 20px;
    border-radius: 10px;
    font-size: clamp(10px, 2.5vh, 20px);
    white-space: pre-wrap;
    animation: fadeIn ${({$role}) => $role === EngineRole.user ? '500ms' : '1000ms'} ease-in;

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
`;

const Message: React.FC<MessageProps> = ({i, message}) => {

    const messageRef = useRef<HTMLDivElement>(null);

    return (<MessageBlockStyled
        ref={messageRef}
        $role={message.role}
        $engine={message.engine}>
        <MessageHeader {...{i, message, messageRef}}/>
        <MarkdownRenderer text={message.content}/>
        {message.content}
    </MessageBlockStyled>)
}

export default Message;