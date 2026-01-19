import {ReactComponent as CopyIcon} from '../../icons/Copy.svg';
import {ReactComponent as DeleteIcon} from '../../icons/Delete.svg';
import {ReactComponent as RepeatIcon} from '../../icons/Repeat.svg';
import React, {useContext, useRef} from "react";
import {contextEngine, EngineRole, IEngineMessage} from "../../api/gptApi";
import {MessageRefProps} from "./models";
import EnginePrefix from "./EnginePrefix";
import {ChatContext} from "../../context/ChatContext";
import {useAskEngine} from "../../hooks/useAskEngine";
import useSupabaseDelete from "../../hooks/useSupabaseDelete";

const MessageHeader: React.FC<MessageRefProps> = ({i, message, messageRef}) => {
    const {
        messages,
        params,
        engine,
        model,
        deleteMessagesList,
        setDeleteMessagesList,
        isDeleting,
        setIsDeleting
    } = useContext(ChatContext);
    const askEngine = useAskEngine(params);

    const copyIconRef = useRef<SVGSVGElement>(null);
    const isInProgress = message.role === EngineRole.inprogress;
    const isValidRole = !(message.role === EngineRole.user);
    const isRepeatAvailable = !isValidRole && messages.length - 1 === i;

    const deleteMessage = useSupabaseDelete();

    const handleDeleteMessage = async () => {
        if (!isDeleting) {
            setIsDeleting(true);
            const newList = [...deleteMessagesList, {...message, index: i}];
            setDeleteMessagesList(newList);
            await deleteMessage(newList);
            setIsDeleting(false);
        }
    };

    const handleCopy = () => {
        if (messageRef.current?.textContent) {
            navigator.clipboard.writeText(messageRef.current.getElementsByTagName("div")[1].textContent || '');
            const animateClick = copyIconRef?.current?.getElementsByTagName('animateTransform')[0];
            if (animateClick) {
                animateClick.beginElement();
            }
        }
    };

    const handleRepeat = () => {
        const lastMessage = messages.pop() as IEngineMessage;
        contextEngine.deleteMessage(i);
        contextEngine.update({content: lastMessage.content, role: EngineRole.user, engine, model});
        askEngine();
    };

    return (
        <div>
            {(isValidRole || isInProgress) && <EnginePrefix {...{message}}/>}
            {!isInProgress && <CopyIcon ref={copyIconRef} cursor="pointer" onClick={handleCopy}/>}
            {!isInProgress &&
                <DeleteIcon style={{opacity: isDeleting ? 0.5 : 1}} cursor="pointer" onClick={handleDeleteMessage}/>}
            {isRepeatAvailable && !isInProgress && <RepeatIcon cursor="pointer" onClick={handleRepeat}/>}
        </div>)
}

export default MessageHeader;