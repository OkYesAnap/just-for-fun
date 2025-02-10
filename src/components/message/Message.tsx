import {contextEngine, engineRole, IEngineMessage} from "../../api/gptApi";
import {MessageBlock} from "../styled";
import React, {Dispatch, SetStateAction} from "react";
import LoaderAnimation from "../loader/Loader";
import DeepSeek from "../../icons/DeepSeek_logo.svg"
import OpenAI from "../../icons/OpenAI_Logo.svg"
import {Engines} from "../../utils/constanst";

interface MessageProps {
	i: number,
	message: IEngineMessage,
	setMessages: Dispatch<SetStateAction<IEngineMessage[]>>
}

const Message = ({i, message, setMessages}: MessageProps) => {
	const handleDeleteMessage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, messageNumber: number) => {
		if (e.ctrlKey || e.metaKey) {
			const messages = contextEngine.deleteMessage(messageNumber);
			setMessages([...messages]);
		}
	}

	const EnginePrefix = () => {
		if (!(message.role === engineRole.user) && message.engine === Engines.DEEP_SEEK) {
			return (<img src={DeepSeek} style={{height: '50px', color: "#fff"}} alt="Deepseek Icon"/>)
		}
		if (!(message.role === engineRole.user) && message.engine === Engines.GPT) {
			return (<img src={OpenAI} style={{height: '50px', color: "#fff"}} alt="Deepseek Icon"/>)
		}
		return null
	}

	return (<MessageBlock
		role={message.role}
		engine={message.engine}
		onClick={(e) => handleDeleteMessage(e, i)}
		key={i}>
		<>
			<EnginePrefix/>
			<div>{message.content} {'inprogress' === message.role && <LoaderAnimation/>}</div>
		</>
	</MessageBlock>)
}

export default Message;