import {RefObject, Dispatch, SetStateAction, useCallback} from "react";
import {engineRole, IEngineMessage, requestToEngine} from "../api/gptApi";
import {defaultTextInputSize, Engines} from "../utils/constanst";
import {TextAreaRef} from "antd/es/input/TextArea";
import {HatPageProps} from "../pages/ChatPage";

interface AskEngineProps {
	textAreaRef: RefObject<TextAreaRef>,
	setAskInProgress: Dispatch<SetStateAction<boolean>>,
	setText: Dispatch<SetStateAction<string>>,
	text: string,
	params: HatPageProps,
	engine: Engines,
	setMessages: Dispatch<SetStateAction<IEngineMessage[]>>,
	messages: IEngineMessage[],
}

const useAskEngine = ({
	                      textAreaRef,
	                      setAskInProgress,
	                      setText,
	                      text,
	                      params,
	                      engine,
	                      setMessages,
	                      messages
                      }: AskEngineProps) => {
	const askEngine = useCallback(async () => {
		if (textAreaRef?.current?.resizableTextArea) {
			const lineHeight = parseInt(getComputedStyle(textAreaRef.current.resizableTextArea.textArea).lineHeight, 10);
			textAreaRef.current.resizableTextArea.textArea.style.height = `${lineHeight * defaultTextInputSize + 24}px`;
		}
		if (!text.length) return;
		setAskInProgress(true);
		setMessages([...messages, {content: text, role: engineRole.user}, {
			content: "I am thinking",
			engine,
			role: engineRole.inprogress
		}]);
		const messagesFromGpt = await requestToEngine({content: text, role: engineRole.user, engine}, params);
		setMessages(messagesFromGpt);
		setAskInProgress(false);
		setText('');
	}, [messages, params, text, engine])
	return askEngine
}
export {useAskEngine};