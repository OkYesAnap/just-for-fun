import {contextEngine, EngineRole, IEngineMessage} from "../../api/gptApi";
import React, {Dispatch, SetStateAction} from "react";
import EnginePrefix from './EnginePrefix';
import styled from 'styled-components';

const setBackgroundColor = ($role: EngineRole) => {
	if ($role === EngineRole.user) {
		return "#414158";
	} else if ($role === EngineRole.error) {
		return "red";
	}
	return 'rgba(0, 0, 0, 0)'
}

interface MessageBlockProps {
	$role: EngineRole;
	$engine?: string;
}

export const MessageBlock = styled.div<MessageBlockProps>`
  margin: ${({$role}) => ($role === 'user' ? '10px 10vmin 10px 20px' : '10px auto 10px 10vmin')};
  text-align: left;
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
`
interface MessageProps {
	i: number,
	message: IEngineMessage,
	setMessages: Dispatch<SetStateAction<IEngineMessage[]>>
}

const Message: React.FC<MessageProps> = ({i, message, setMessages}) => {
	const handleDeleteMessage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, messageNumber: number) => {
		if (e.ctrlKey || e.metaKey) {
			const messages = contextEngine.deleteMessage(messageNumber);
			setMessages([...messages]);
		}
	};
	const isInProgress = message.role === EngineRole.inprogress;
	const isValidRole = !(message.role === EngineRole.user);
	return (<MessageBlock
		$role={message.role}
		$engine={message.engine}
		onClick={(e) => handleDeleteMessage(e, i)}>
		{(isValidRole || isInProgress) && <EnginePrefix {...{message}}/>}
		<div>{message.content}</div>
	</MessageBlock>)
}

export default Message;