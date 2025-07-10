import React, {useEffect, useState} from "react";
import {MarkdownItemProps} from "./interfaces";
import {getMdContentIndexes} from "../../utils/getMdContentIndexes";
import BuildMdContent from "./BuildMdContent";
import {tag} from "../../constants/textTags";

const MarkdownRenderer: React.FC<{ text: string }> = ({text}) => {
    const [codePartIndexes, setCodePartIndexes] = useState<MarkdownItemProps[]>([]);

    useEffect(() => {
        const code = getMdContentIndexes(text, tag.code);
        const bold = getMdContentIndexes(text, tag.bold);
        const italic = getMdContentIndexes(text, tag.italic);
        const thirdHeading = getMdContentIndexes(text, tag.head);
        const sorted = [
            ...code,
            ...bold,
            ...italic,
            ...thirdHeading
        ].sort((a, b) => a.begin! - b.begin!);

        const clearedInterceptions = sorted.reduce((accum: any, item) => {
            if (accum.length < 1) {
                accum.push(item);
                return accum
            }
            if (item.begin! >= accum[accum.length - 1]?.end) {
                accum.push(item);
            }
            return accum;
        }, []);

        setCodePartIndexes(clearedInterceptions);
    }, [text]);

    return (
        <div>
            <BuildMdContent text={text} parsedArray={codePartIndexes}/>
        </div>
    )
};

export default MarkdownRenderer