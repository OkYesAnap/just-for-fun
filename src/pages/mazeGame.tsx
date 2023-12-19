import React, {useState} from 'react'
import {contextGPT, gptRole, IGptMessage, requestToGpt} from "../api/gptApi";
import {ButtonAskBlock} from "../components/styled";

const MazeGame = (params: { model: string, sysMessage: IGptMessage[] }) => {
    const [messages, setMessages] = useState<IGptMessage[]>([]);
    const [askInProgress, setAskInProgress] = useState(false);
    const askGpt = async () => {
        contextGPT.clear()
        setAskInProgress(true);
        setMessages([{
            content: "I am thinking",
            role: gptRole.inprogress
        }]);
        const messagesFromGpt = await requestToGpt({
            content: "",
            role: gptRole.user
        }, params);
        setMessages(messagesFromGpt);
        setAskInProgress(false);
    }
    return (<>
    Hello {askInProgress ? 'Generating' : ''}
    <ButtonAskBlock onClick={askGpt} disabled={askInProgress} className={'text-props'}>Ask
        GPT</ButtonAskBlock>
          {messages.map((message) => {
              const startIndex = message.content.indexOf('[');
              const endIndex = message.content.lastIndexOf(']');
              console.log(message?.content ?? JSON.parse(message?.content?.substring(startIndex, endIndex + 1)))
                  return <div style={{whiteSpace: "pre-wrap"}}>{message.content}</div>
              }
          )}
    </>)
}
export default MazeGame;