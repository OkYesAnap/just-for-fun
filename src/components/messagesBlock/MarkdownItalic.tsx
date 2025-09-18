import React from "react";
import styled from "styled-components";

const MarkdownSemiBoldStyled = styled.span`
    font-style: italic;
`;

const MarkdownItalic: React.FC<{ mdItem: string }> = ({mdItem}) => {
    return <MarkdownSemiBoldStyled>{mdItem}</MarkdownSemiBoldStyled>
};

export default MarkdownItalic