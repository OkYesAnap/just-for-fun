import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {MessageBlock} from "../styled";
import {gptRole} from "../../api/gptApi";

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

const DraftText: React.FC<{ text: string }> = ({text}) => {
	const [transcript, setTranscript] = useState<string>(text);
	useEffect(() => {
		let timeOut: NodeJS.Timeout;
		if (!text) {
			timeOut = setTimeout(() => setTranscript(text), FADE_DURATION)
		} else {
			setTranscript(text)
		}
		return () => {
			if (timeOut) clearTimeout(timeOut)
		};
	}, [text]);
	return <DraftTextComponent $hastext={!!text}>
		<MessageBlock
			style={{margin: '0'}}
			role={gptRole.user}>
			{transcript}
		</MessageBlock>
	</DraftTextComponent>
}

export default DraftText;