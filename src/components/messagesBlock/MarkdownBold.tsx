import React from "react";
import {MarkdownItemProps} from "./interfaces";
import styled from "styled-components";

const MarkdownBoldStyled = styled.span`
    font-weight: bold;
`;

const MarkdownBold: React.FC<{ mdItem: MarkdownItemProps }> = ({mdItem}) => {
    return <MarkdownBoldStyled>{mdItem.content}</MarkdownBoldStyled>
};

export default MarkdownBold