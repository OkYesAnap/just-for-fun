import {contextEngine, engineRole, IEngineMessage} from "../../api/gptApi";
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
	const isInProgress = message.role === engineRole.inprogress;
	const isValidRole = !(message.role === engineRole.user)
	return (<MessageBlock
		role={message.role}
		engine={message.engine}
		onClick={(e) => handleDeleteMessage(e, i)}
		key={i}>
		<>
			{(isValidRole || isInProgress) && <EnginePrefix {...{message}}/>}
			<div>{message.content}</div>
		</>
	</MessageBlock>)
}

export default Message;