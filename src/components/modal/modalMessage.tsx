import React, { useEffect } from "react";
import {Modal} from "antd";

interface ModalWindowProps {
    okCallback: () => void;
    cancelCallback: () => void;
    visible: boolean;
    message?: string;
}

const ModalWindow: React.FC<ModalWindowProps> = ({okCallback, cancelCallback, visible, message}) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && visible) {
                okCallback();
            }
        };
        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [okCallback, visible]);

    return (
        <>
            <Modal
                title="Are you sure you want to clear the dialog context?"
                open={visible}
                onOk={okCallback}
                onCancel={cancelCallback}
            >
                <p>{message}</p>
            </Modal>
        </>
    );
};

export default ModalWindow;