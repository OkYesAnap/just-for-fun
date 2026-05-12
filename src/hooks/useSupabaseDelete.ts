import {contextEngine, IEngineMessage} from "../api/gptApi";
import {useCallback, useContext} from "react";
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";

const useSupabaseDelete = () => {
    const {setMessages, setDeleteMessagesList} = useContext(ChatContext);
    const {authUser} = useContext(AuthContext);
    return useCallback(async (deleteMessagesList: IEngineMessage[]) => {
        const indexes = deleteMessagesList.map((msg) => msg.index || 0);
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
        }
    }, [authUser?.token, setDeleteMessagesList, setMessages]);
};
export default useSupabaseDelete