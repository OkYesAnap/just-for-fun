import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {EngineRole} from "../../api/gptApi";
import {ChatContext} from "../../context/ChatContext";
import {MessageBlock} from '../messagesBlock/Message';

const FADE_DURATION = 500;

const DraftTextComponent = styled.div<{ $hastext: boolean }>`
  position: fixed;
  opacity: ${({$hastext}) => ($hastext === true ? "100%" : "0%")};
  transition: opacity ${FADE_DURATION}ms ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const DraftText: React.FC= () => {

	const {draftText} = useContext(ChatContext);
	const [transcript, setTranscript] = useState<string>(draftText);
	useEffect(() => {
		let timeOut: NodeJS.Timeout;
		if (!draftText) {
			timeOut = setTimeout(() => setTranscript(draftText), FADE_DURATION)
		} else {
			setTranscript(draftText)
		}
		return () => {
			if (timeOut) clearTimeout(timeOut)
		};
	}, [draftText]);

	return <DraftTextComponent $hastext={!!draftText}>
		<MessageBlock
			style={{margin: '0'}}
			$role={EngineRole.user}>
			{transcript}
		</MessageBlock>
	</DraftTextComponent>
}

export default DraftText;