import React, {useContext} from "react";
import BuildMdContentV2 from "./BuildMdContentV2";
import {ChatContext} from "../../context/ChatContext";

const MarkdownRenderer: React.FC<{ text: string, index: number }> = ({text, index}) => {
    const {isDeleting, deleteMessagesList} = useContext(ChatContext);
    const ids = deleteMessagesList.map(msg => msg.index);
    const isDeletingMessages = isDeleting && ids.includes(index);
    return <div style={{opacity: isDeletingMessages ? 0.5 : 1}}>
        <BuildMdContentV2 text={text}/>
    </div>
};

export default MarkdownRenderer