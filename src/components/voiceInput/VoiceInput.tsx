import React from "react";
import {Dispatch, SetStateAction} from 'react';
import {ButtonAsk} from "../styled";
import styled from "styled-components";
import {Dropdown} from "antd";
import {voiceEngines, VoiceEngineSingleType} from "../../utils/constanst";

const VoiceInputBlock = styled.div`
  flex-direction: column;
  flex: 3;
`

type BoolSetState = Dispatch<SetStateAction<boolean>>;

interface IVoiceListeningProps {
	isListening: boolean;
	setIsListening: BoolSetState;
	autoAsk: boolean;
	setAutoAsk: BoolSetState;
	start: (lang: string) => void;
	voiceInputEngine: VoiceEngineSingleType;
	setVoiceInputEngine: React.Dispatch<React.SetStateAction<VoiceEngineSingleType>>;
	googleRecognizerAvailable: boolean;
}

const VoiceInput: React.FC<IVoiceListeningProps> = ({
	isListening,
	setIsListening,
	autoAsk,
	setAutoAsk,
	start,
	voiceInputEngine,
	setVoiceInputEngine,
    googleRecognizerAvailable,
}) => {

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
		           onClick={() => start("en-EN")}>EN</ButtonAsk>
		<ButtonAsk disabled={isListening} style={{background: "blue", flexGrow: "1"}}
		           onClick={() => start("ru-RU")}>RU</ButtonAsk>
		<ButtonAsk disabled={!isListening || autoAsk} style={{background: "purple"}}
		           onClick={() => setAutoAsk((prev) => !prev)}>Auto Ask</ButtonAsk>
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