import React from 'react';
import {IEngineMessage} from '../api/gptApi';
import '../App.css';
import {useGoogleRecognition} from "../hooks/useGoogleRecongnition";
import ModalWindow from "../components/modal/ModalMessage";
import useVoiceRecorder from "../hooks/useVioceRecorder";
import DraftText from "../components/draftText/DraftText";
import MessagesBlock from "../components/messagesBlock/MessagesBlock";
import InputBlock from "../components/inputBlock/InputBlock";
import EngineHeader from "../components/header/Header";


export interface ChatPageProps {
	model: string,
	sysMessage: IEngineMessage[]
}

function ChatPage(params: ChatPageProps) {
	useGoogleRecognition();
	useVoiceRecorder();
	return (
		<>
			<EngineHeader/>
			<MessagesBlock/>
			<InputBlock {...params}/>
			<DraftText/>
			<ModalWindow/>
		</>
	);
}

export default ChatPage;
