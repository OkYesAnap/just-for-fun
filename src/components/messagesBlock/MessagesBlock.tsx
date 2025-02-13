import styled from "styled-components";
import {IEngineMessage} from "../../api/gptApi";
import Message from "./Message";
import React, {useContext, useEffect, useRef} from "react";
import {ChatContext} from "../../context/ChatContext";

const MessagesBlockStyled = styled.div`
  position: absolute;
  margin-top: 3vmin;
  width: 100%;
  height: 75%;
  overflow: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  align-items: end;
`

const MessagesBlock: React.FC = () => {
	const chatBlockRef = useRef<HTMLDivElement>(null);
	const {messages, setMessages} = useContext(ChatContext);

	useEffect(() => {
		if (chatBlockRef?.current) chatBlockRef.current.scrollTop = chatBlockRef.current.scrollHeight;
	}, [messages])

	return (<MessagesBlockStyled ref={chatBlockRef}>
		<>
			{messages.map((message: IEngineMessage, i) => {
				return <Message key={i} {...{i, message, setMessages}}/>
			})}
		</>
	</MessagesBlockStyled>)
}

export default MessagesBlock;