import React from "react";
import styled from "styled-components";
import {MessageBlock} from "../styled";
import {gptRole} from "../../api/gptApi";

const DraftTextComponent = styled.div`
  position: absolute;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const DraftText: React.FC<{ text: string }> = ({text}) => {
	return <DraftTextComponent>
		<MessageBlock
			style={{margin: '0'}}
			role={gptRole.user}>
			{text}
		</MessageBlock>
	</DraftTextComponent>
}

export default DraftText;