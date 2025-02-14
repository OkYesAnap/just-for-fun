import React, {useContext} from "react";
import {UnputButton} from "./InputButton";
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
		<UnputButton disabled={isListening} style={{background: "blue", flexGrow: "1"}}
		             onClick={() => startListenVoice("en-EN")}>EN</UnputButton>
		<UnputButton disabled={isListening} style={{background: "blue", flexGrow: "1"}}
		             onClick={() => startListenVoice("ru-RU")}>RU</UnputButton>
		<UnputButton disabled={!isListening || autoAsk} style={{background: "purple"}}
		             onClick={() => setAutoAsk((prev) => !prev)}>Auto</UnputButton>
	</div>);

	const GPTButtons = () => (<>
		<UnputButton style={{background: "blue", flexGrow: "1"}}
		             onClick={() => setIsListening((prevState) => !prevState)}>
			{!isListening ? "Listen" : "Recognize"}
		</UnputButton>
	</>)

	return <VoiceInputBlock>
		<Dropdown menu={{items}} disabled={isListening || !googleRecognizerAvailable} placement="top">
			<div>{voiceInputEngine}</div>
		</Dropdown>
		<div style={{width: "100%", display: "flex"}}>
			{voiceInputEngine === voiceEngines.google ? <GoogleButtons/> : <GPTButtons/>}
			<UnputButton disabled={!isListening} style={{background: "red"}}
			             onClick={() => {setIsListening(false)
								 setAutoAsk(false)}}>stop</UnputButton>
		</div>
	</VoiceInputBlock>
}

export default VoiceInput;