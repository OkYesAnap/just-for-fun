import {useCallback, useContext} from "react";
import {contextEngine, EngineRole, requestToEngine} from "../api/gptApi";
import {ChatPageProps} from "../pages/ChatPage";
import {ChatContext} from "../context/ChatContext";

const useAskEngine = (params: ChatPageProps) => {
    const {
        setText,
        setAskInProgress,
        setMessages,
        engine,
        model,
        setImageBase64
    } = useContext(ChatContext);

    const handleAsk = useCallback(async () => {
        setAskInProgress(true);
        setMessages([
            ...contextEngine.get(),
            {
                content: "I am thinking",
                engine,
                model,
                role: EngineRole.inprogress,
            },
        ]);
        const messagesFromGpt = await requestToEngine(params);
        setMessages(messagesFromGpt);
        setAskInProgress(false);
        setText('');
        setImageBase64('');
    }, [setAskInProgress, setMessages, engine, model, params, setText, setImageBase64]);

    return handleAsk;
};

export {useAskEngine};