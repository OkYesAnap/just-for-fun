import React, {useContext} from "react";
import {ButtonAsk} from "../styled";
import styled from "styled-components";
import {Dropdown} from "antd";
import {voiceEngines} from "../../utils/constanst";
import {ChatContext} from "../../context/ChatContext";

const VoiceInputBlock = styled.div`
  flex-direction: column;
  flex: 3;
`

const VoiceInput: React.FC = () => {

	const {
		isListening,
		setIsListening,
		autoAsk,
		setAutoAsk,
		voiceInputEngine,
		setVoiceInputEngine,
		googleRecognizerAvailable,
		startListenVoice
	} = useContext(ChatContext);

	const items = [
		{
			key: "1",
			label: (<div onClick={() => setVoiceInputEngine(voiceEngines.google)}>{voiceEngines.google}</div>)
		},
		{
			key: "2",
			label: (<div onClick={() => setVoiceInputEngine(voiceEngines.gpt)}>{voiceEngines.gpt}</div>)
		}
	]

	const GoogleButtons = () => (<div style={{flexGrow: "1", display: "flex"}}>
		<ButtonAsk disabled={isListening} style={{background: "blue", flexGrow: "1"}}
		           onClick={() => startListenVoice("en-EN")}>EN</ButtonAsk>
		<ButtonAsk disabled={isListening} style={{background: "blue", flexGrow: "1"}}
		           onClick={() => startListenVoice("ru-RU")}>RU</ButtonAsk>
		<ButtonAsk disabled={!isListening || autoAsk} style={{background: "purple"}}
		           onClick={() => setAutoAsk((prev) => !prev)}>Auto</ButtonAsk>
	</div>);

	const GPTButtons = () => (<>
		<ButtonAsk style={{background: "blue", flexGrow: "1"}}
		           onClick={() => setIsListening((prevState) => !prevState)}>
			{!isListening ? "Listen" : "Recognize"}
		</ButtonAsk>
	</>)

	return <VoiceInputBlock>
		<Dropdown menu={{items}} disabled={isListening || !googleRecognizerAvailable} placement="top">
			<div>{voiceInputEngine}</div>
		</Dropdown>
		<div style={{width: "100%", display: "flex"}}>
			{voiceInputEngine === voiceEngines.google ? <GoogleButtons/> : <GPTButtons/>}
			<ButtonAsk disabled={!isListening} style={{background: "red"}}
			           onClick={() => {setIsListening(false)
								 setAutoAsk(false)}}>stop</ButtonAsk>
		</div>
	</VoiceInputBlock>
}

export default VoiceInput;