import React, {useContext} from "react";
import InputButton from "./InputButton";
import styled from "styled-components";
import {Dropdown} from "antd";
import {voiceEngines} from "../../utils/constanst";
import {ChatContext} from "../../context/ChatContext";
import InputLabel from "./InputLabel";

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
		<InputButton disabled={isListening} style={{flexGrow: "1"}}
		             onClick={() => startListenVoice("en-EN")}>EN</InputButton>
		<InputButton disabled={isListening} style={{flexGrow: "1"}}
		             onClick={() => startListenVoice("ru-RU")}>RU</InputButton>
		<InputButton disabled={!isListening || autoAsk}
		             onClick={() => setAutoAsk((prev) => !prev)}>Auto</InputButton>
	</div>);

	const GPTButtons = () => (<>
		<InputButton style={{flexGrow: "1"}}
		             onClick={() => setIsListening((prevState) => !prevState)}>
			{!isListening ? "Listen" : "Recognize"}
		</InputButton>
	</>)

	return <VoiceInputBlock>
		<Dropdown menu={{items}} disabled={isListening || !googleRecognizerAvailable} placement="top">
			<div><InputLabel>{voiceInputEngine}</InputLabel></div>
		</Dropdown>
		<div style={{width: "100%", display: "flex"}}>
			{voiceInputEngine === voiceEngines.google ? <GoogleButtons/> : <GPTButtons/>}
			<InputButton disabled={!isListening}
			             onClick={() => {
				             setIsListening(false)
				             setAutoAsk(false)
			             }}>stop</InputButton>
		</div>
	</VoiceInputBlock>
}

export default VoiceInput;