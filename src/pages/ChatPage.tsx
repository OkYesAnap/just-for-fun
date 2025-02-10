import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Input} from 'antd';
import {contextEngine, engineRole, IEngineMessage, requestToEngine} from '../api/gptApi';
import styled from 'styled-components';
import '../App.css';
import {ButtonAsk} from '../components/styled'
import {useLocation} from 'react-router-dom';
import {routeHeader} from "./Main";
import {useGoogleRecognition} from "../utils/useGoogleRecongnition";
import ModalWindow from "../components/modal/ModalMessage";
import VoiceInput from "../components/voiceInput/VoiceInput";
import useVoiceRecorder from "../utils/useVioceRecorder";
import {Engines, voiceEngines, VoiceEngineSingleType} from "../utils/constanst";
import DraftText from "../components/draftText/DraftText";
import {TextAreaRef} from "antd/es/input/TextArea";
import EngineChanger from "../components/engineChanger/EngineChanger";
import Message from "../components/message/Message";

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

const defaultTextInputSize = 2;

function HatPage(params: { model: string, sysMessage: IEngineMessage[] }) {
	const location = useLocation().pathname.slice(1);
	useEffect(() => {
		document.title = routeHeader[location];
		return () => {
			document.title = "React app"
			contextEngine.clear();
		}
	}, [location])

	const [text, setText] = useState('');
	const [draftText, setDraftText] = useState('');
	const [lang, setLang] = useState<string>('')
	const chatBlockRef = useRef<HTMLDivElement>(null);
	const [messages, setMessages] = useState<IEngineMessage[]>([]);
	const [askInProgress, setAskInProgress] = useState(false);
	const [showClearModal, setShowClearModal] = useState(false);
	const [isListening, setIsListening] = useState<boolean>(false);
	const [autoAsk, setAutoAsk] = useState<boolean>(false);
	const [voiceInputEngine, setVoiceInputEngine] = useState<VoiceEngineSingleType>(voiceEngines.google);
	const [googleRecognizerAvailable, setGoogleRecognizerAvailable] = useState<boolean>(true);
	const [engine, setEngine] = useState<Engines>(Engines.GPT);
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
			textAreaRef.current.resizableTextArea.textArea.style.height = `${lineHeight * defaultTextInputSize + 24}px`;
		}
		if (!text.length) return;
		setAskInProgress(true);
		setMessages([...messages, {content: text, role: engineRole.user}, {
			content: "I am thinking",
			role: engineRole.inprogress
		}]);
		const messagesFromGpt = await requestToEngine({content: text, role: engineRole.user, engine}, params);
		setMessages(messagesFromGpt);
		setAskInProgress(false);
		setText('');
	}, [messages, params, text, engine])

	const lastMessage = messages[messages.length - 1];
	const hasText = !!text.trim().length;

	useLayoutEffect(() => {
		if (textAreaRef.current?.resizableTextArea) {
			const lineHeight = parseInt(getComputedStyle(textAreaRef.current.resizableTextArea.textArea).lineHeight, 10);
			textAreaRef.current.resizableTextArea.textArea.style.height = `${lineHeight * defaultTextInputSize + 24}px`;
			const {scrollHeight} = textAreaRef.current.resizableTextArea.textArea;
			textAreaRef.current.resizableTextArea.textArea.style.height = `${scrollHeight + 4}px`;
		}
	}, [text]);

	useEffect(() => {
		if (chatBlockRef?.current) chatBlockRef.current.scrollTop = chatBlockRef.current.scrollHeight;
	}, [lastMessage])

	useEffect(() => {
			if (autoAsk && isListening && !askInProgress && hasText) {
				askGpt();
			}
			if (!text) {
				textAreaRef?.current?.focus();
			}
		},
		[lastMessage, askInProgress, autoAsk, isListening, askGpt, hasText, text]);

	const handleEnterPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
		if (event.ctrlKey && event.key === 'Enter' && !askInProgress) {
			askGpt();
		}
		if (event.key === 'Escape' && !askInProgress) {
			setShowClearModal(true);
		}
	};

	const clearChat = () => {
		setMessages(contextEngine.clear());
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
					{messages.map((message: IEngineMessage, i) => {
						return <Message {...{i, message, setMessages}}/>
					})}
				</>
			</ChatBlock>
			<InputBlock>
				<div className={'text-props'} style={{display: "flex"}}>
					<div style={{flex: "5", display: "flex", flexFlow: "column"}}>
						<EngineChanger {...{engine, setEngine}}/>
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
