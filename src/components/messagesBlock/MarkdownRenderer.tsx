import React from "react";
import BuildMdContentV2 from "./BuildMdContentV2";

const MarkdownRenderer: React.FC<{ text: string }> = ({text}) => {

    return <div>
        <BuildMdContentV2 text={text}/>
    </div>
};

export default MarkdownRenderer