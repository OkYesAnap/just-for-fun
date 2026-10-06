import React from "react";
import styled from "styled-components";

const MarkdownLinkStyled = styled.a`
    color: #1e90ff;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        color: #00bfff;
    }
`;

const MarkdownLink: React.FC<{ mdItem: string }> = ({mdItem}) => {
    const [linkText, linkUrl] = mdItem.split("|||");
    return <MarkdownLinkStyled href={linkUrl} target="_blank" rel="noopener noreferrer">{linkText}</MarkdownLinkStyled>;
};

export default MarkdownLink;