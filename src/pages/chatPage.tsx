import React, {useState, useRef, useEffect} from 'react';
import {Input, Spin} from 'antd';
import {contextGPT, gptRole, IGptMessage, requestToGpt} from '../api/gptApi';
import styled from 'styled-components';
import '../App.css';
import ModalWindow from '../components/modal/modalMessage';
import {ButtonAskBlock} from '../components/styled'

const ChatBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 75%;
  overflow: auto;
  scroll-behavior: smooth;
`
const setBeckgroundColor = (role: gptRole) => {
    if (role === gptRole.user) {
        return "darkolivegreen";
    } else if (role === gptRole.error) {
        return "red";
    }
    return 'green'
}

const MessageBlock = styled.div`
  margin: ${({role}) => (role === 'user' ? '10px 10vmin 10px 20px' : '10px 20px 10px 10vmin')};
  text-align: left;
  background-color: ${({role}) => setBeckgroundColor(role as gptRole)};
  padding: 20px;
  border-radius: 10px;
  white-space: pre-wrap;
  animation: fadeIn ${({role}) => role === 'user' ? '500ms' : '1000ms'} ease-in;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`

const InputBlock = styled.div`
  position: fixed;
  height: 25%;
  bottom: 0;
  width: 80%;
`

function ChatPage(params: { model: string, sysMessage:IGptMessage[] }) {
    const [text, setText] = useState('');
    const chatBlockRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<IGptMessage[]>([]);
    const [askInProgress, setAskInProgress] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);

    useEffect(() => {
            if (chatBlockRef?.current) chatBlockRef.current.scrollTop = chatBlockRef.current.scrollHeight;
        },
        [messages])

    const askGpt = async () => {
        setAskInProgress(true);
        setMessages([...messages, {content: text, role: gptRole.user}, {
            content: "I am thinking",
            role: gptRole.inprogress
        }]);
        const messagesFromGpt = await requestToGpt({content: text, role: gptRole.user}, params);
        setMessages(messagesFromGpt);
        setAskInProgress(false);
        setText('');
    }

    const handleEnterPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.ctrlKey && event.key === 'Enter' && !askInProgress) {
            askGpt();
        }
        if (event.key === 'Escape' && !askInProgress) {
            setShowClearModal(true);
        }
    };

    const LoaderAnimation = () => {
        return <Spin size="large"/>
    }

    const clearChat = () => {
        setMessages(contextGPT.clear());
        setShowClearModal(false);
    }

    return (
        <>
            <ChatBlock ref={chatBlockRef}>
                <div>Hello page with chat</div>
                <>
                    {messages.map((message: IGptMessage | Error, i) => {
                        if (message instanceof Error) return <div>{message.message}</div>
                        return (
                            <MessageBlock
                                role={message.role}
                                key={i}>
                                {message.content} {message.role === 'inprogress' && <LoaderAnimation/>}
                            </MessageBlock>
                        )
                    })}
                </>
            </ChatBlock>
            <InputBlock>
                <ButtonAskBlock onClick={askGpt} disabled={askInProgress} className={'text-props'}>Ask
                    GPT</ButtonAskBlock>
                <Input.TextArea rows={4} className={'text-props'} value={text}
                                onChange={({target}) => setText(target.value)} onKeyDown={handleEnterPress}/>
            </InputBlock>
            {<ModalWindow visible={showClearModal}
                         okCallback={clearChat}
                         cancelCallback={() => setShowClearModal(false)}
                         message={'If you click the OK button, the chat will be reset to its initial context. You will have to start the entire dialogue from the beginning.'}
            />}
        </>
    );
}

export default ChatPage;
