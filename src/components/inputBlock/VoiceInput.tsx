import React, {useContext} from "react";
import InputButton from "./InputButton";
import styled from "styled-components";
import {Popover} from "antd";
import {voiceEngines} from "../../utils/constanst";
import {ChatContext} from "../../context/ChatContext";
import InputLabel from "./InputLabel";
import DropdownMenu from "./DropdownMenu";
import {MenuItems} from "./interfaces";
import {getMenuItems} from "../../utils/menuItems";

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

	let items: MenuItems = getMenuItems({
			items: voiceEngines,
			onClickCallback: setVoiceInputEngine
		}
	);


	if (!googleRecognizerAvailable) {
		items = items.filter(item => item.key !== voiceEngines.google)
	}

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
	return (
		<VoiceInputBlock>
			<Popover content={<DropdownMenu {...{items, activeItem: voiceInputEngine}}/>} placement="top">
				<div><InputLabel>{voiceInputEngine}</InputLabel></div>
			</Popover>
			<div style={{width: "100%", display: "flex"}}>
				{voiceInputEngine === voiceEngines.google ? <GoogleButtons/> : <GPTButtons/>}
				<InputButton disabled={!isListening}
				             onClick={() => {
					             setIsListening(false)
					             setAutoAsk(false)
				             }}>stop</InputButton>
			</div>
		</VoiceInputBlock>)
}

export default VoiceInput;