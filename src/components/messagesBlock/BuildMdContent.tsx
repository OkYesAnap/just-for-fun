import React from "react";
import {MarkdownItemProps} from "./interfaces";
import MarkdownBold from "./MarkdownBold";
import MarkdownThirdHeading from "./MarkdownThirdHeading";
import {tag} from "../../constants/textTags";
import MarkdownItalic from "./MarkdownItalic";

const BuildMdContent: React.FC<{ text: string, parsedArray: MarkdownItemProps[] }> = ({text, parsedArray}) => {
    const lastIndex = parsedArray.length - 1;
    if (!parsedArray.length) return <>{text}</>;

    return (
        <>
            {parsedArray.map((mdItem, i) => {
                const content: JSX.Element[] = [];
                if (i === 0) {
                    content.push(<span key={`begin-${i}`}>{text.slice(0, mdItem.begin!)}</span>);
                } else {
                    content.push(<span key={`begin-${i}`}>{text.slice(parsedArray[i - 1].end!, mdItem.begin!)}</span>)
                }
                switch (mdItem.tag) {
                    case tag.code: {
                        // content.push(<MarkdownCode key={`code-${i}`}{...{mdItem}}/>);
                        break;
                    }
                    case tag.bold: {
                        content.push(<MarkdownBold key={`bold-${i}`}{...{mdItem: mdItem.content || ""}}/>);
                        break;
                    }
                    case tag.italic: {
                        content.push(<MarkdownItalic key={`italic-${i}`}{...{mdItem: mdItem.content || ""}}/>);
                        break;
                    }
                    case tag.head: {
                        content.push(<MarkdownThirdHeading key={`third-heading-${i}`}{...{mdItem}}/>);
                        break;
                    }
                }
                if (i === lastIndex) {
                    content.push(<span key={`end-${i}`}>{text.slice(mdItem.end!, text.length)}</span>);
                }
                return content;
            })
            }
        </>
    )
};

export default BuildMdContent;