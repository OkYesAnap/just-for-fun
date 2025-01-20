import React from "react";
import {Dispatch, SetStateAction, useState} from 'react';
import {ButtonAsk} from "../styled";
import styled from "styled-components";
import {Dropdown} from "antd";

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
}

const voiceEngines = {
	google: "Google Voice Input",
	gpt: "GPT Api Voice Input",
}

const VoiceInput: React.FC<IVoiceListeningProps> = ({isListening, setIsListening, autoAsk, setAutoAsk, start}) => {
	const [voiceInputSelector, setVoiceInputSelector] = useState<string>(voiceEngines.google);

	const items = [
		{
			key: "1",
			label: (<div onClick={() => setVoiceInputSelector(voiceEngines.google)}>{voiceEngines.google}</div>)
		},
		{
			key: "2",
			label: (<div onClick={() => setVoiceInputSelector(voiceEngines.gpt)}>{voiceEngines.gpt}</div>)
		}
	]

	const GoogleButtons = () => (<div style={{flexGrow: "1", display: "flex"}}>
		<ButtonAsk disabled={isListening} style={{background: "blue", flexGrow: "1"}}
		           onClick={() => start("en-EN")}>EN</ButtonAsk>
		<ButtonAsk disabled={isListening} style={{background: "blue", flexGrow: "1"}}
		           onClick={() => start("ru-RU")}>RU</ButtonAsk>
	</div>);

	const GPTButtons = () => (<>
		<ButtonAsk disabled={isListening} style={{background: "blue", flexGrow: "1"}}>Listen</ButtonAsk>
	</>)

	return <VoiceInputBlock>
		<Dropdown menu={{items}} placement="top">
			<div>{voiceInputSelector}</div>
		</Dropdown>
		<div style={{width: "100%", display: "flex"}}>
			{voiceInputSelector === voiceEngines.google ? <GoogleButtons/> : <GPTButtons/>}
			<ButtonAsk disabled={!isListening || autoAsk} style={{background: "purple"}}
			           onClick={() => setAutoAsk((prev) => !prev)}>Auto Ask</ButtonAsk>
			<ButtonAsk disabled={!isListening} style={{background: "red"}}
			           onClick={() => setIsListening(false)}>stop</ButtonAsk>
		</div>
	</VoiceInputBlock>
}

export default VoiceInput;