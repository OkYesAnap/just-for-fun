import {useCallback, useContext} from "react";
import {EngineRole, requestToEngine} from "../api/gptApi";
import {ChatPageProps} from "../pages/ChatPage";
import {ChatContext} from "../context/ChatContext";

const useAskEngine = (params: ChatPageProps) => {

    const {text, setText, setAskInProgress, setMessages, messages, engine, model} = useContext(ChatContext);
    return useCallback(async () => {
        // if (!text.length) return;
        setAskInProgress(true);
        setMessages([...messages, {
            content: "I am thinking",
            engine,
            model,
            role: EngineRole.inprogress
        }]);
        const messagesFromGpt = await requestToEngine(params);
        setMessages(messagesFromGpt);
        setAskInProgress(false);
        setText('');
    }, [messages, params, text, engine, setAskInProgress, setMessages, setText, model]);
};
export {useAskEngine};