import React from "react";
import BuildMdContentV2 from "./BuildMdContentV2";

const MarkdownRenderer: React.FC<{ text: string }> = ({text}) => {

    return <>
        <BuildMdContentV2 text={text}/>
    </>
};

export default MarkdownRenderer