import React, {useMemo} from "react";
import mdTagAdapter, {AdapterData} from "../../utils/mdTagAdapter";
import {TAG, TEMP_TAGS} from "../../constants/textTags";
import MarkdownBold from "./MarkdownBold";
import MarkdownItalic from "./MarkdownItalic";
import MarkdownCode from "./MarkdownCode";
import MarkdownTable from "./MarkdownTable";


interface DataIndexes {
    [key: string]: number
}

const getData = (data: AdapterData, dataIndexes: DataIndexes, tag: keyof typeof TEMP_TAGS) => {
    dataIndexes[tag] += 1;
    return data.cuts[TEMP_TAGS[tag]][dataIndexes[tag] - 1]
}

const BuildMdContentV2: React.FC<{ text: string }> = ({text}) => {
    const content = useMemo(() => {
        const data = mdTagAdapter(text);
        const dataIndexes: DataIndexes = {};
        for (let key in TEMP_TAGS) {
            dataIndexes[key] = 0
        }
        return (
            <>
                {data.adoptedTextArr.map((val: keyof typeof TEMP_TAGS, i: number) => {
                    switch (val) {
                        case TEMP_TAGS[TAG.starThree]: {
                            return <b key={i}>{getData(data, dataIndexes, TAG.starThree)}</b>
                        }
                        case TEMP_TAGS[TAG.starTwoBold]: {
                            const mdItem = getData(data, dataIndexes, TAG.starTwoBold);
                            return <MarkdownBold key={`bold-${i}`}{...{mdItem}}/>
                        }
                        case TEMP_TAGS[TAG.starOneItalic]: {
                            const mdItem = getData(data, dataIndexes, TAG.starOneItalic);
                            return <MarkdownItalic key={`italic-${i}`}{...{mdItem}}/>
                        }
                        case TEMP_TAGS[TAG.code]: {
                            const mdItem = getData(data, dataIndexes, TAG.code);
                            return <MarkdownCode key={`code-${i}`}{...{mdItem}}/>
                        }
                        case TEMP_TAGS[TAG.table]: {
                            const mdItem = getData(data, dataIndexes, TAG.table);
                            return <MarkdownTable key={`bold-${i}`}{...{mdItem}}/>
                        }
                        default:
                            return <span key={i}>{val}</span>
                    }
                })}
            </>
        );
    }, [text]);

    return content;
}
export default BuildMdContentV2;