import React from "react";
import styled from "styled-components";

const MarkdownBoldStyled = styled.span`
    font-weight: bold;
`;

const MarkdownBold: React.FC<{ mdItem: string }> = ({mdItem}) => {
    return <MarkdownBoldStyled>{mdItem}</MarkdownBoldStyled>
};

export default MarkdownBold