import {useCallback, useContext} from "react";
import {contextEngine, EngineRole, requestToEngine} from "../api/gptApi";
import {ChatPageProps} from "../pages/ChatPage";
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";

const useAskEngine = (params: ChatPageProps) => {
    const {authUser} = useContext(AuthContext);
    const {
        setText,
        setAskInProgress,
        setMessages,
        engine,
        model,
        setImageBase64,
        setErrorMessage
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
        try {
            const messagesFromGpt = await requestToEngine({params, authUser});
            setMessages(messagesFromGpt);
            
            // Check if the last message is an error and show transient warning
            const lastMsg = messagesFromGpt[messagesFromGpt.length - 1];
            if (lastMsg?.role === EngineRole.error) {
                setErrorMessage(typeof lastMsg.content === 'string' ? lastMsg.content : String(lastMsg.content));
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            setErrorMessage(errorMessage);
        } finally {
            setAskInProgress(false);
            setText('');
            setImageBase64('');
        }
    }, [setAskInProgress, setMessages, engine, model, params, authUser, setText, setImageBase64, setErrorMessage]);

    return handleAsk;
};

export {useAskEngine};