import React, {useEffect} from 'react';
import {contextEngine, IEngineMessage} from '../api/gptApi';
import '../App.css';
import {useLocation} from 'react-router-dom';
import {routeHeader} from "./Main";
import {useGoogleRecognition} from "../hooks/useGoogleRecongnition";
import ModalWindow from "../components/modal/ModalMessage";
import useVoiceRecorder from "../hooks/useVioceRecorder";
import DraftText from "../components/draftText/DraftText";
import MessagesBlock from "../components/messagesBlock/MessagesBlock";
import InputBlock from "../components/inputBlock/InputBlock";


export interface ChatPageProps {
	model: string,
	sysMessage: IEngineMessage[]
}

function ChatPage(params: ChatPageProps) {
	const location = useLocation().pathname.slice(1);
	useEffect(() => {
		document.title = routeHeader[location];
		return () => {
			document.title = "React app"
			contextEngine.clear();
		}
	}, [location])

	useGoogleRecognition();
	useVoiceRecorder();

	return (
		<>
			<div>{routeHeader[location]}</div>
			<MessagesBlock/>
			<InputBlock {...params}/>
			<DraftText/>
			<ModalWindow />
		</>
	);
}

export default ChatPage;
