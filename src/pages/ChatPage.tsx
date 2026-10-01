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
import {ChatContext} from "../context/ChatContext";
import ErrorWarning from "../components/errorWarning/ErrorWarning";


export interface ChatPageProps {
    model?: string,
    chatName: string,
    userId?: string
    sysMessage: IEngineMessage[]
}

const ChatPage: React.FC = () => {
    const {askInProgress, errorMessage, setErrorMessage} = React.useContext(ChatContext);
    useGoogleRecognition();
    useVoiceRecorder();

    return (
        <>
            <ErrorWarning message={errorMessage} onClear={() => setErrorMessage(null)} />
            <EngineHeader/>
            <MessagesBlock/>
            {!askInProgress && <InputBlock/>}
            <DraftText/>
            <ModalWindow/>
        </>
    );
}

export default ChatPage;
