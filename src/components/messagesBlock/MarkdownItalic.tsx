import React from "react";
import {MarkdownItemProps} from "./interfaces";
import styled from "styled-components";

const MarkdownSemiBoldStyled = styled.span`
    font-style: italic;
`;

const MarkdownItalic: React.FC<{ mdItem: MarkdownItemProps }> = ({mdItem}) => {
    return <MarkdownSemiBoldStyled>{mdItem.content}</MarkdownSemiBoldStyled>
};

export default MarkdownItalic