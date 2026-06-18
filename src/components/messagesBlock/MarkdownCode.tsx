import React, {useMemo, useRef} from "react";
import {ReactComponent as CopyIcon} from '../../icons/Copy.svg';
import styled from "styled-components";


const CodeHeaderStyled = styled.div`
    background-color: darkgray;
    border-radius: 20px 20px 0 0;
    color: black;
    font-weight: bold;
    font-size: 20px;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const MarkdownCodeStyled = styled.div`
    font-size: 16px;
    background-color: black;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
`;

const CodeContentStyled = styled.div`
    padding: 10px 15px 20px;
`;

const MarkdownCode: React.FC<{ mdItem: string }> = ({mdItem}) => {
    const copyIconRef = useRef<SVGSVGElement>(null);
    const codeTextRef = useRef<HTMLDivElement>(null);
    const splitHeaderAndContent = useMemo(() => {
        const temp = mdItem.split("\n");
        return {header: temp.shift() || '', content: temp.join("\n")};
    }, [mdItem]);

    const handleCopy = () => {
        if (codeTextRef.current?.textContent) {
            console.log(codeTextRef.current || '');

            navigator.clipboard.writeText(codeTextRef.current.textContent || '');
            const animateClick = copyIconRef?.current?.getElementsByTagName('animateTransform')[0];
            if (animateClick) {
                animateClick.beginElement();
            }
        }
    };

    return <MarkdownCodeStyled>
        <CodeHeaderStyled>
            {splitHeaderAndContent.header.toUpperCase()}
            <CopyIcon ref={copyIconRef} style={{width: "25px"}} onClick={handleCopy}/>
        </CodeHeaderStyled>
        <CodeContentStyled ref={codeTextRef}>{splitHeaderAndContent.content}</CodeContentStyled>
    </MarkdownCodeStyled>
};

export default MarkdownCode;