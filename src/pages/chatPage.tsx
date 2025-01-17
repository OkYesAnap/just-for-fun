import React, {useState, useRef, useEffect} from 'react';
import {Input, Spin} from 'antd';
import {contextGPT, gptRole, IGptMessage, requestToGpt} from '../api/gptApi';
import styled from 'styled-components';
import '../App.css';
import ModalWindow from '../components/modal/modalMessage';
import {ButtonAsk} from '../components/styled'
import {useLocation} from 'react-router-dom';
import {routeHeader} from "./main";

const ChatBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 75%;
  overflow: auto;
  scroll-behavior: smooth;
`
const setBackgroundColor = (role: gptRole) => {
	if (role === gptRole.user) {
		return "darkolivegreen";
	} else if (role === gptRole.error) {
		return "red";
	}
	return 'green'
}

const MessageBlock = styled.div`
  margin: ${({role}) => (role === 'user' ? '10px 10vmin 10px 20px' : '10px 20px 10px 10vmin')};
  text-align: left;
  background-color: ${({role}) => setBackgroundColor(role as gptRole)};
  padding: 20px;
  border-radius: 10px;
  white-space: pre-wrap;
  animation: fadeIn ${({role}) => role === 'user' ? '500ms' : '1000ms'} ease-in;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`

const InputBlock = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25%;
  bottom: 0;
  width: 80%;
`

const useRecognition = (isListening: boolean,
                        setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
                        setText: React.Dispatch<React.SetStateAction<string>>,
                        lang: string) => {
	//@ts-ignore
	const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
	recognition.lang = lang;
	recognition.onaudioend = () => setIsListening(false);
	useEffect(() => {
		recognition.continuous = true;
		recognition.interimResults = true;

		//@ts-ignore
		recognition.onresult = (event: SpeechRecognitionEvent) => {
			const currentTranscript = event.results[event.resultIndex][0].transcript;
			console.log(event.results);
			const isFinal = event.results[event.resultIndex].isFinal;
			if (isFinal) setText((prev) => prev + ' ' + currentTranscript);
		};
		if (isListening) {
			recognition.start()
		} else {
			recognition.stop();
		}
		return () => {
			recognition.stop();
		};
	}, [isListening]);

}

function ChatPage(params: { model: string, sysMessage: IGptMessage[] }) {
	const [text, setText] = useState('');
	const [lang, setLang] = useState<string>('')
	const chatBlockRef = useRef<HTMLDivElement>(null);
	const [messages, setMessages] = useState<IGptMessage[]>([]);
	const [askInProgress, setAskInProgress] = useState(false);
	const [showClearModal, setShowClearModal] = useState(false);
	const location = useLocation().pathname.slice(1);
	const [isListening, setIsListening] = useState<boolean>(false);
	const [autoAsk, setAutoAsk] = useState<boolean>(false);

	useRecognition(isListening, setIsListening, setText, lang);

	useEffect(() => {
			if (autoAsk && isListening && !askInProgress) {
				askGpt();
			}
			if (chatBlockRef?.current) chatBlockRef.current.scrollTop = chatBlockRef.current.scrollHeight;
		},
		[messages[messages.length - 1], text]);

	useEffect(() => {
		document.title = routeHeader[location];
		return () => {
			document.title = "React app"
			contextGPT.clear();
		}
	}, [location])

	const askGpt = async () => {
		if(!text.length) return;
		setAskInProgress(true);
		setMessages([...messages, {content: text, role: gptRole.user}, {
			content: "I am thinking",
			role: gptRole.inprogress
		}]);
		const messagesFromGpt = await requestToGpt({content: text, role: gptRole.user}, params);
		setMessages(messagesFromGpt);
		setAskInProgress(false);
		setText('');
	}

	const handleDeleteMessage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, messageNumber: number) => {
		if (e.ctrlKey) {
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
					<ButtonAsk onClick={() => {
						setAutoAsk(false);
						askGpt()
					}} style={{flex: "5"}}disabled={askInProgress}>Manual Ask</ButtonAsk>
					<ButtonAsk disabled={isListening} style={{background: "green"}} onClick={() => start("en-EN")}>Voice EN</ButtonAsk>
					<ButtonAsk disabled={isListening} style={{background: "green"}} onClick={() => start("ru-RU")}>Voice RU</ButtonAsk>
					<ButtonAsk disabled={!isListening || autoAsk} style={{background: "purple"}} onClick={() => setAutoAsk((prev) => !prev)}>Auto Ask</ButtonAsk>
					<ButtonAsk disabled={!isListening} style={{background: "red"}} onClick={() => setIsListening(false)}>stop</ButtonAsk>
				</div>
				<Input.TextArea rows={4} className={'text-props'} value={text} disabled={(autoAsk && isListening) || askInProgress}
				                onChange={({target}) => setText(target.value)} onKeyDown={handleEnterPress}/>
			</InputBlock>
			{<ModalWindow visible={showClearModal}
			              okCallback={clearChat}
			              cancelCallback={() => setShowClearModal(false)}
			              message={'If you click the OK button, the chat will be reset to its initial context. You will have to start the entire dialogue from the beginning.'}
			/>}
		</>
	);
}

export default ChatPage;
