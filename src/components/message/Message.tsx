import {contextEngine, EngineRole, IEngineMessage} from "../../api/gptApi";
import {MessageBlock} from "../styled";
import React, {Dispatch, SetStateAction} from "react";
import EnginePrefix from './EnginePrefix';

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
	const isValidRole = !(message.role === EngineRole.user)
	return (<MessageBlock
		role={message.role}
		$engine={message.engine}
		onClick={(e) => handleDeleteMessage(e, i)}>
		{(isValidRole || isInProgress) && <EnginePrefix {...{message}}/>}
		<div>{message.content}</div>
	</MessageBlock>)
}

export default Message;