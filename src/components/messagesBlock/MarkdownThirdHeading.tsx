import React from "react";
import {MarkdownItemProps} from "./interfaces";
import styled from "styled-components";

const MarkdownThirdHeadingStyled = styled.span`
  font-weight: bolder;
  font-size: clamp(14px, 3vh, 30px);
`;

const MarkdownThirdHeading: React.FC<{ mdItem: MarkdownItemProps }> = ({mdItem}) => {
	return <MarkdownThirdHeadingStyled>{mdItem.title?.slice(3)}</MarkdownThirdHeadingStyled>
};

export default MarkdownThirdHeading