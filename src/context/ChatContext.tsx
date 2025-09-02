import React, {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";
import {Engines, ModelTypes, voiceEngines, VoiceEngineSingleType} from "../constants/constants";
import {IEngineMessage} from "../api/gptApi";
import {ChatPageProps} from "../pages/ChatPage";


interface ChatContextType {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    draftText: string;
    setDraftText: Dispatch<SetStateAction<string>>;
    messages: IEngineMessage[];
    setMessages: Dispatch<SetStateAction<IEngineMessage[]>>
    isListening: boolean;
    setIsListening: Dispatch<SetStateAction<boolean>>;
    autoAsk: boolean;
    setAutoAsk: Dispatch<SetStateAction<boolean>>;
    startListenVoice: (lang: string) => void;
    voiceInputEngine: VoiceEngineSingleType;
    setVoiceInputEngine: Dispatch<SetStateAction<VoiceEngineSingleType>>;
    googleRecognizerAvailable: boolean;
    setGoogleRecognizerAvailable: Dispatch<SetStateAction<boolean>>
    lang: string;
    setLang: Dispatch<SetStateAction<string>>;
    askInProgress: boolean;
    setAskInProgress: Dispatch<SetStateAction<boolean>>;
    showClearModal: boolean;
    setShowClearModal: Dispatch<SetStateAction<boolean>>;
    engine: Engines;
    setEngine: Dispatch<SetStateAction<Engines>>;
    model: ModelTypes;
    setModel: Dispatch<SetStateAction<ModelTypes>>;
    params: ChatPageProps;
    setParams: Dispatch<SetStateAction<ChatPageProps>>
}

export const ChatContext = createContext<ChatContextType>(null!);

const ChatContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [text, setText] = useState('');
    const [draftText, setDraftText] = useState('');
    const [messages, setMessages] = useState<IEngineMessage[]>([]);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [autoAsk, setAutoAsk] = useState<boolean>(false);
    const [voiceInputEngine, setVoiceInputEngine] = useState<VoiceEngineSingleType>(voiceEngines.google);
    const [googleRecognizerAvailable, setGoogleRecognizerAvailable] = useState<boolean>(true);
    const [lang, setLang] = useState<string>('');
    const [askInProgress, setAskInProgress] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [engine, setEngine] = useState<Engines>(Engines.GPT);
    const [model, setModel] = useState<ModelTypes>("");
    const [params, setParams] = useState<ChatPageProps>({model: '', sysMessage: []});


    const startListenVoice = (lang: string) => {
        setLang(lang);
        setIsListening(true);
    };

    return (
        <ChatContext.Provider value={{
            text, setText,
            draftText, setDraftText,
            messages, setMessages,
            isListening, setIsListening,
            autoAsk, setAutoAsk,
            startListenVoice,
            voiceInputEngine, setVoiceInputEngine,
            googleRecognizerAvailable, setGoogleRecognizerAvailable,
            lang, setLang,
            askInProgress, setAskInProgress,
            showClearModal, setShowClearModal,
            engine, setEngine,
            model, setModel,
            params, setParams,
        }}>
            {children}
        </ChatContext.Provider>
    )
};

export {ChatContextProvider}