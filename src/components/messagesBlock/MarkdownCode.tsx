import {MarkdownItemProps} from "./interfaces";
import React from "react";
import styled from "styled-components";

const MarkdownCodeStyled = styled.div`
  font-size: 16px;
  background-color: black;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const CodeHeaderStyled = styled.div`
  background-color: darkgray;
  border-radius: 20px 20px 0 0;
  color: black;
  font-weight: bold;
  font-size: 20px;
  padding: 5px 20px;
`;

const CodeContentStyled = styled.div`
  padding: 10px 5px 20px;
`;

const MarkdownCode: React.FC<{ mdItem: MarkdownItemProps }> = ({mdItem}) => {
	return <MarkdownCodeStyled>
		<CodeHeaderStyled>{mdItem.title!.toUpperCase()}</CodeHeaderStyled>
		<CodeContentStyled>{mdItem.content?.slice(0, -3)}</CodeContentStyled>
	</MarkdownCodeStyled>
};

export default MarkdownCode;