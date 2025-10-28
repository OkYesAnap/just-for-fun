import {ReactComponent as CopyIcon} from '../../icons/Copy.svg';
import {ReactComponent as DeleteIcon} from '../../icons/Delete.svg';
import {ReactComponent as RepeatIcon} from '../../icons/Repeat.svg';
import React, {useContext, useRef} from "react";
import {contextEngine, EngineRole, IEngineMessage} from "../../api/gptApi";
import {MessageRefProps} from "./models";
import EnginePrefix from "./EnginePrefix";
import {ChatContext} from "../../context/ChatContext";
import {useAskEngine} from "../../hooks/useAskEngine";

const MessageHeader: React.FC<MessageRefProps> = ({i, message, messageRef}) => {
    const {messages, setMessages, params, engine, model} = useContext(ChatContext);
    const askEngine = useAskEngine(params);

    const copyIconRef = useRef<SVGSVGElement>(null);
    const isInProgress = message.role === EngineRole.inprogress;
    const isValidRole = !(message.role === EngineRole.user);
    const isRepeatAvailable = !isValidRole && messages.length - 1 === i;

    const deleteMessage = () => {
        const messages = contextEngine.deleteMessage(i);
        setMessages([...messages]);
    };

    const handleDeleteMessage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.ctrlKey || e.metaKey) {
            deleteMessage();
        }
    };

    const handleCopy = () => {
        if (messageRef.current?.textContent) {
            navigator.clipboard.writeText(messageRef.current.textContent);
            const animateClick = copyIconRef?.current?.getElementsByTagName('animateTransform')[0];
            if (animateClick) {
                animateClick.beginElement();
            }
        }
    };

    const handleRepeat = () => {
        const lastMessage = messages.pop() as IEngineMessage;
        deleteMessage();
        contextEngine.update({content: lastMessage.content, role: EngineRole.user, engine, model});
        askEngine();
    };

    return <div onClick={(e) => handleDeleteMessage(e)}>
        {(isValidRole || isInProgress) && <EnginePrefix {...{message}}/>}
        {!isInProgress && <CopyIcon ref={copyIconRef} cursor="pointer" onClick={handleCopy}/>}
        {!isInProgress && <DeleteIcon cursor="pointer" onClick={deleteMessage}/>}
        {isRepeatAvailable && !isInProgress && <RepeatIcon cursor="pointer" onClick={handleRepeat}/>}
    </div>
}

export default MessageHeader;