import React, {useState, useRef, useEffect, useCallback, useLayoutEffect} from 'react';
import {Input, Spin} from 'antd';
import {contextGPT, gptRole, IGptMessage, requestToGpt} from '../api/gptApi';
import styled from 'styled-components';
import '../App.css';
import {ButtonAsk, MessageBlock} from '../components/styled'
import {useLocation} from 'react-router-dom';
import {routeHeader} from "./Main";
import {useGoogleRecognition} from "../utils/useGoogleRecongnition";
import ModalWindow from "../components/modal/ModalMessage";
import VoiceInput from "../components/voiceInput/VoiceInput";
import useVoiceRecorder from "../utils/useVioceRecorder";
import {voiceEngines, VoiceEngineSingleType} from "../utils/constanst";
import DraftText from "../components/draftText/DraftText";
import {TextAreaRef} from "antd/es/input/TextArea";

const ChatBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 75%;
  overflow: auto;
  scroll-behavior: smooth;
`

const InputBlock = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  max-height: 90%;
  bottom: 0;
  width: 80%;
  background-color: #282c34;
`

function HatPage(params: { model: string, sysMessage: IGptMessage[] }) {
	const location = useLocation().pathname.slice(1);
	useEffect(() => {
		document.title = routeHeader[location];
		return () => {
			document.title = "React app"
			contextGPT.clear();
		}
	}, [location])

	const [text, setText] = useState('');
	const [draftText, setDraftText] = useState('');
	const [lang, setLang] = useState<string>('')
	const chatBlockRef = useRef<HTMLDivElement>(null);
	const [messages, setMessages] = useState<IGptMessage[]>([]);
	const [askInProgress, setAskInProgress] = useState(false);
	const [showClearModal, setShowClearModal] = useState(false);
	const [isListening, setIsListening] = useState<boolean>(false);
	const [autoAsk, setAutoAsk] = useState<boolean>(false);
	const [voiceInputEngine, setVoiceInputEngine] = useState<VoiceEngineSingleType>(voiceEngines.google);
	const [googleRecognizerAvailable, setGoogleRecognizerAvailable] = useState<boolean>(true);
	const textAreaRef = useRef<TextAreaRef>(null);

	useGoogleRecognition({
		isListening: isListening && voiceInputEngine === voiceEngines.google,
		setIsListening,
		setText,
		lang,
		setDraftText,
		setVoiceInputEngine,
		setGoogleRecognizerAvailable
	});
	useVoiceRecorder(isListening && voiceInputEngine === voiceEngines.gpt, setText);

	const askGpt = useCallback(async () => {
		if (textAreaRef.current?.resizableTextArea) {
			const lineHeight = parseInt(getComputedStyle(textAreaRef.current.resizableTextArea.textArea).lineHeight, 10);
			textAreaRef.current.resizableTextArea.textArea.style.height = `${lineHeight * 4 + 24}px`;
		}
		if (!text.length) return;
		setAskInProgress(true);
		setMessages([...messages, {content: text, role: gptRole.user}, {
			content: "I am thinking",
			role: gptRole.inprogress
		}]);
		const messagesFromGpt = await requestToGpt({content: text, role: gptRole.user}, params);
		setMessages(messagesFromGpt);
		setAskInProgress(false);
		setText('');
	}, [messages, params, text])

	const lastMessage = messages[messages.length - 1];
	const hasText = !!text.trim().length;

	useLayoutEffect(() => {
		if (textAreaRef.current?.resizableTextArea) {
			const lineHeight = parseInt(getComputedStyle(textAreaRef.current.resizableTextArea.textArea).lineHeight, 10);
			textAreaRef.current.resizableTextArea.textArea.style.height = `${lineHeight * 2 + 24}px`;
			const {scrollHeight} = textAreaRef.current.resizableTextArea.textArea;
			textAreaRef.current.resizableTextArea.textArea.style.height = `${scrollHeight + 4}px`;
		};
	}, [text]);

	useEffect(() => {
		if (chatBlockRef?.current) chatBlockRef.current.scrollTop = chatBlockRef.current.scrollHeight;
	}, [lastMessage])

	useEffect(() => {
			if (autoAsk && isListening && !askInProgress && hasText) {
				askGpt();
			}
		},
		[lastMessage, askInProgress, autoAsk, isListening, askGpt, hasText]);

	const handleDeleteMessage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, messageNumber: number) => {
		if (e.ctrlKey || e.metaKey) {
			const messages = contextGPT.deleteMessage(messageNumber);
			setMessages([...messages]);
		}
	}

	const handleEnterPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
		if (event.ctrlKey && event.key === 'Enter' && !askInProgress) {
			askGpt();
		}
		if (event.key === 'Escape' && !askInProgress) {
			setShowClearModal(true);
		}
	};

	const LoaderAnimation = () => {
		return <Spin size="large"/>
	}

	const clearChat = () => {
		setMessages(contextGPT.clear());
		setShowClearModal(false);
	}

	const start = (lang: string) => {
		setLang(lang)
		setIsListening(true);
	}

	const onChangeTextAria = (e: any) => {
		setText(e.target.value);
	}

	return (
		<>
			<ChatBlock ref={chatBlockRef}>
				<div>{routeHeader[location]}</div>
				<>
					{messages.map((message: IGptMessage | Error, i) => {
						if (message instanceof Error) return <div>{message.message}</div>
						return (
							<MessageBlock
								role={message.role}
								onClick={(e) => handleDeleteMessage(e, i)}
								key={i}>
								{message.content} {message.role === 'inprogress' && <LoaderAnimation/>}
							</MessageBlock>
						)
					})}
				</>
			</ChatBlock>
			<InputBlock>
				<div className={'text-props'} style={{display: "flex"}}>
					<div style={{flex: "5", display: "flex", flexFlow: "column"}}>
						<div>"Ask" for manual request to GPT.</div>
						<ButtonAsk onClick={() => {
							setAutoAsk(false);
							askGpt()
						}} style={{flexGrow: "1"}} disabled={askInProgress}>Ask</ButtonAsk>
					</div>

					<VoiceInput {...{
						isListening,
						setIsListening,
						autoAsk,
						setAutoAsk,
						start,
						voiceInputEngine,
						setVoiceInputEngine,
						googleRecognizerAvailable
					}}/>
				</div>
				<Input.TextArea className={'text-props'} value={text} ref={textAreaRef}
				                disabled={(autoAsk && isListening) || askInProgress}
				                onChange={onChangeTextAria} onKeyDown={handleEnterPress}/>
			</InputBlock>
			<DraftText text={draftText}/>
			{<ModalWindow visible={showClearModal}
			              okCallback={clearChat}
			              cancelCallback={() => setShowClearModal(false)}
			              message={'If you click the OK button, the chat will be reset to its initial context. You will have to start the entire dialogue from the beginning.'}
			/>}
		</>
	);
}

export default HatPage;
