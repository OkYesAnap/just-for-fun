import EngineChanger from "../engineChanger/EngineChanger";
import {UnputButton} from "./InputButton";
import VoiceInput from "./VoiceInput";
import {Input} from "antd";
import React, {useContext, useEffect, useLayoutEffect, useRef} from "react";
import styled from "styled-components";
import {ChatContext} from "../../context/ChatContext";
import {TextAreaRef} from "antd/es/input/TextArea";
import {useAskEngine} from "../../hooks/useAskEngine";
import {setTextAreaActualHeight} from "../../utils/textArea";
import {ChatPageProps} from "../../pages/ChatPage";

const InputBlockStyled = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  max-height: 95%;
  bottom: 0;
  padding-top: 10px;
  width: 80%;
`

const InputBlock: React.FC<ChatPageProps> = (params) => {

	const textAreaRef = useRef<TextAreaRef>(null);
	const askEngine = useAskEngine({textAreaRef, params});
	const {
		setAutoAsk,
		engine,
		setEngine,
		askInProgress,
		autoAsk,
		isListening,
		text,
		setShowClearModal,
		setText
	} = useContext(ChatContext);
	const hasText = !!text.trim().length;

	useLayoutEffect(() => {
		setTextAreaActualHeight(textAreaRef);
	}, [text]);

	useEffect(() => {
			if (autoAsk && isListening && !askInProgress && hasText) {
				askEngine();
			}
			if (!text) {
				textAreaRef?.current?.focus();
			}
		},
		[askInProgress, autoAsk, isListening, askEngine, hasText, text]);

	const handleEnterPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
		if (event.ctrlKey && event.key === 'Enter' && !askInProgress) {
			askEngine();
		}
		if (event.key === 'Escape' && !askInProgress) {
			setShowClearModal(true);
		}
	};

	const onChangeTextAria = (e: any) => {
		setText(e.target.value);
	};

	const onAskClick = () => {
		setAutoAsk(false);
		askEngine();
	}

	return (
		<InputBlockStyled>
			<div className={'text-props'} style={{display: "flex", backgroundColor: "#282c34"}}>
				<div style={{flex: "5", display: "flex", flexFlow: "column"}}>
					<EngineChanger {...{engine, setEngine}}/>
					<UnputButton onClick={onAskClick} style={{flexGrow: "1"}} disabled={askInProgress}>Ask</UnputButton>
				</div>
				<VoiceInput/>
			</div>
			<Input.TextArea className={'text-props'} value={text} ref={textAreaRef}
			                disabled={(autoAsk && isListening) || askInProgress}
			                onChange={onChangeTextAria} onKeyDown={handleEnterPress}/>
		</InputBlockStyled>)
}

export default InputBlock;