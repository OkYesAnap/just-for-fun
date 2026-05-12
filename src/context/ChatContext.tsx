import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import {Engines, Models, ModelTypes, voiceEngines, VoiceEngineSingleType} from "../constants/constants";
import {IEngineMessage, supabaseGet} from "../api/gptApi";
import {ChatPageProps} from "../pages/ChatPage";
import {AuthContext} from "./AuthContext";

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
    setParams: Dispatch<SetStateAction<ChatPageProps>>;
    imageBase64: string;
    setImageBase64: Dispatch<SetStateAction<string>>;
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
    const url = useRef<URL>(new URL(window.location.href));
    const requestDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
    const {authUser} = useContext(AuthContext) || "unlogged";
    const [imageBase64, setImageBase64] = useState<string>('');

    const {initialEngine, initialModel, initialChatName} = useMemo(() => {
        return {
            initialEngine: url.current.searchParams.get("engine") as Engines || Engines.GPT,
            initialModel: url.current.searchParams.get("model") as ModelTypes || Models.gpt[0],
            initialChatName: url.current.pathname.split("/")[1],
        };
    }, []);

    const [engine, setEngine] = useState<Engines>(initialEngine);
    const [model, setModel] = useState<ModelTypes>(initialModel as ModelTypes);
    const [params, setParams] = useState<ChatPageProps>({model: '', sysMessage: [], chatName: ''});
    const [chatName, setChatName] = useState<string>(initialChatName);

    useEffect(() => {
        url.current.searchParams.set('engine', engine);
        url.current.searchParams.set('model', model);
        url.current.searchParams.set('chat', chatName);
        url.current.searchParams.set('user_id', authUser.user?.id || "unlogged");

        if (authUser.user?.id === "unlogged" || !authUser.isAuthenticated) return;
        const fetchMessages = async () => {
            if (requestDebounce.current) {
                clearTimeout(requestDebounce.current);
            }
            requestDebounce.current = setTimeout(async () => {
                setAskInProgress(true);
                const fetchedMessages = await supabaseGet({url: url.current.search, authUser});
                setMessages(fetchedMessages);
                setAskInProgress(false);
            }, 50);


        };
        fetchMessages();
    }, [engine, model, chatName, authUser, authUser.user?.id, authUser.isAuthenticated]);

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
        imageBase64, setImageBase64
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
        params,
        imageBase64
    ]);

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    )
};

export {ChatContextProvider}