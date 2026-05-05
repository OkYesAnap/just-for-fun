import React, {useContext, useEffect} from 'react';
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
import {AuthContext} from "../context/AuthContext";


export interface ChatPageProps {
    model?: string,
    chatName: string,
    userId?: string
    sysMessage: IEngineMessage[]
}

const ChatPage: React.FC<ChatPageProps> = (params) => {
    const {setParams, askInProgress} = React.useContext(ChatContext);
    const {authUser} = useContext(AuthContext);
    useGoogleRecognition();
    useVoiceRecorder();

    useEffect(() => {
        setParams({...params, userId: authUser.user?.id || ""});
    }, [setParams, params]);

    return (
        <>
            <EngineHeader/>
            <MessagesBlock/>
            {!askInProgress && <InputBlock/>}
            <DraftText/>
            <ModalWindow/>
        </>
    );
}

export default ChatPage;
