import {contextEngine, IEngineMessage} from "../api/gptApi";
import {useCallback, useContext} from "react";
import {ChatContext} from "../context/ChatContext";

const useSupabaseDelete = () => {
    const {setMessages, setDeleteMessagesList} = useContext(ChatContext);
    return useCallback(async (deleteMessagesList: IEngineMessage[]) => {
        const indexes = deleteMessagesList.map((msg) => msg.index || 0);
        const response = await fetch('/api/delete', {
            method: "DELETE",
            body: JSON.stringify(deleteMessagesList)
        });
        if (response.status === 200 || response.status === 404) {
            const messages = contextEngine.deleteMessagesList(indexes);
            setMessages([...messages]);
            setDeleteMessagesList([]);
        }
    }, [setDeleteMessagesList, setMessages]);
}
export default useSupabaseDelete