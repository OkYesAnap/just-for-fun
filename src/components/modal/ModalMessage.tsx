import React, {useCallback, useContext, useEffect} from "react";
import {Modal} from "antd";
import {ChatContext} from "../../context/ChatContext";
import {contextEngine} from "../../api/gptApi";
import useSupabaseDelete from "../../hooks/useSupabaseDelete";

const message = 'If you click the OK button, the chat will be reset to its initial context. You will have to start the entire dialogue from the beginning.'

const ModalWindow: React.FC = () => {
    const deleteMessages = useSupabaseDelete();
    const {
        setMessages,
        showClearModal, setShowClearModal,
    } = useContext(ChatContext);

    const clearChat = useCallback(() => {
        deleteMessages(contextEngine.get());
        setShowClearModal(false);
        setMessages(contextEngine.clear());
    }, [deleteMessages, setMessages, setShowClearModal]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && showClearModal) {
                clearChat();
            }
        };
        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [showClearModal, clearChat]);

    return (
        <>
            <Modal
                title="Are you sure you want to clear the dialog context?"
                open={showClearModal}
                onOk={clearChat}
                onCancel={() => setShowClearModal(false)}
            >
                <p>{message}</p>
            </Modal>
        </>
    );
};

export default ModalWindow;