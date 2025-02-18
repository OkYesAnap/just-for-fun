import {RefObject, useCallback, useContext} from "react";
import {EngineRole, requestToEngine} from "../api/gptApi";
import {TextAreaRef} from "antd/es/input/TextArea";
import {ChatPageProps} from "../pages/ChatPage";
import {ChatContext} from "../context/ChatContext";
import {setTextAreaActualHeight} from "../utils/textArea";

interface AskEngineProps {
	textAreaRef: RefObject<TextAreaRef>,
	params: ChatPageProps,
}

const useAskEngine = ({textAreaRef, params}: AskEngineProps) => {

	const {text, setText, setAskInProgress, setMessages, messages, engine, model} = useContext(ChatContext);
	const askEngine = useCallback(async () => {
		setTextAreaActualHeight(textAreaRef, true);
		if (!text.length) return;
		setAskInProgress(true);
		setMessages([...messages, {content: text, role: EngineRole.user}, {
			content: "I am thinking",
			engine,
			model,
			role: EngineRole.inprogress
		}]);
		const messagesFromGpt = await requestToEngine({content: text, role: EngineRole.user, engine, model}, params);
		setMessages(messagesFromGpt);
		setAskInProgress(false);
		setText('');
	}, [messages, params, text, engine, setAskInProgress, setMessages, setText, textAreaRef, model]);
	return askEngine
}
export {useAskEngine};