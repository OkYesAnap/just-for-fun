import React, {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState} from "react";
import {Engines, Models, ModelTypes, voiceEngines, VoiceEngineSingleType} from "../constants/constants";
import {IEngineMessage, supabaseGet} from "../api/gptApi";
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
    isDeleting: boolean;
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
    deleteMessagesList: IEngineMessage[];
    setDeleteMessagesList: Dispatch<SetStateAction<IEngineMessage[]>>;
    autoAsk: boolean;
    setAutoAsk: Dispatch<SetStateAction<boolean>>;
    startListenVoice: (lang: string) => void;
    voiceInputEngine: VoiceEngineSingleType;
    setVoiceInputEngine: Dispatch<SetStateAction<VoiceEngineSingleType>>;
    googleRecognizerAvailable: boolean;
    setGoogleRecognizerAvailable: Dispatch<SetStateAction<boolean>>
    chatName: string;
    setChatName: Dispatch<SetStateAction<string>>;
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
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [deleteMessagesList, setDeleteMessagesList] = useState<IEngineMessage[]>([]);
    const [autoAsk, setAutoAsk] = useState<boolean>(false);
    const [voiceInputEngine, setVoiceInputEngine] = useState<VoiceEngineSingleType>(voiceEngines.google);
    const [googleRecognizerAvailable, setGoogleRecognizerAvailable] = useState<boolean>(true);
    const [lang, setLang] = useState<string>('');
    const [askInProgress, setAskInProgress] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);

    const {initialEngine, initialModel, initialChatName} = useMemo(() => {
        const url = new URL(window.location.href);
        return {
            initialEngine: url.searchParams.get("engine") as Engines || Engines.GPT,
            initialModel: url.searchParams.get("model") as ModelTypes || Models.gpt[0],
            initialChatName: url.pathname.split("/")[1],
        };
    }, []);

    const [engine, setEngine] = useState<Engines>(initialEngine);
    const [model, setModel] = useState<ModelTypes>(initialModel as ModelTypes);
    const [params, setParams] = useState<ChatPageProps>({model: '', sysMessage: [], chatName: ''});
    const [chatName, setChatName] = useState<string>(initialChatName);

    useEffect(() => {
        const url = new URL(window.location.href);

        if (engine) {
            url.searchParams.set('engine', engine);
        }
        if (model) {
            url.searchParams.set('model', model);
        }
        if (chatName) {
            url.searchParams.set('chat', chatName);
        }

        window.history.replaceState({}, '', url);

        const fetchMessages = async () => {
            setAskInProgress(true);
            const fetchedMessages = await supabaseGet(url.search);
            setMessages(fetchedMessages);
            setAskInProgress(false);
        };

        if (engine || model) {
            fetchMessages();
        }
    }, [engine, model, chatName]);

    const startListenVoice = (lang: string) => {
        setLang(lang);
        setIsListening(true);
    };

    const contextValue = useMemo(() => ({
        text, setText,
        draftText, setDraftText,
        messages, setMessages,
        isListening, setIsListening,
        isDeleting, setIsDeleting,
        deleteMessagesList, setDeleteMessagesList,
        autoAsk, setAutoAsk,
        startListenVoice,
        voiceInputEngine, setVoiceInputEngine,
        googleRecognizerAvailable, setGoogleRecognizerAvailable,
        lang, setLang,
        askInProgress, setAskInProgress,
        showClearModal, setShowClearModal,
        chatName, setChatName,
        engine, setEngine,
        model, setModel,
        params, setParams,
    }), [
        text,
        draftText,
        messages,
        isListening,
        isDeleting,
        deleteMessagesList,
        autoAsk,
        chatName,
        voiceInputEngine,
        googleRecognizerAvailable,
        lang,
        askInProgress,
        showClearModal,
        engine,
        model,
        params
    ]);

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    )
};

export {ChatContextProvider}