import {contextEngine, IEngineMessage} from "../api/gptApi";
import {useCallback, useContext} from "react";
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";

const useSupabaseDelete = () => {
    const {setMessages, setDeleteMessagesList, setErrorMessage} = useContext(ChatContext);
    const {authUser} = useContext(AuthContext);
    return useCallback(async (deleteMessagesList: IEngineMessage[]) => {
        const indexes = deleteMessagesList.map((msg) => msg.index || 0);
        try {
            const response = await fetch('/api/delete', {
                method: "DELETE",
                body: JSON.stringify(deleteMessagesList),
                headers: {
                    'Authorization': `Bearer ${authUser?.token}`
                }
            });
            if (response.status === 200 || response.status === 404) {
                const messages = contextEngine.deleteMessagesList(indexes);
                setMessages([...messages]);
                setDeleteMessagesList([]);
            } else {
                setErrorMessage(`Failed to delete messages: HTTP ${response.status}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to delete messages";
            setErrorMessage(errorMessage);
        }
    }, [authUser?.token, setDeleteMessagesList, setMessages, setErrorMessage]);
}
export default useSupabaseDelete