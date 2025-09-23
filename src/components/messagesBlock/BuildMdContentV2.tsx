import React, {useMemo} from "react";
import mdTagAdapter, {AdapterData} from "../../utils/mdTagAdapter";
import {TEMP_TAGS} from "../../constants/textTags";
import MarkdownBold from "./MarkdownBold";
import MarkdownItalic from "./MarkdownItalic";
import MarkdownCode from "./MarkdownCode";


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
                        case TEMP_TAGS["***"]: {
                            return <b>{getData(data, dataIndexes, "***")}</b>
                        }
                        case TEMP_TAGS["**"]: {
                            const mdItem = getData(data, dataIndexes, "**");
                            return <MarkdownBold key={`bold-${i}`}{...{mdItem}}/>
                        }
                        case TEMP_TAGS["* "]: {
                            const mdItem = getData(data, dataIndexes, "* ");
                            return <b key={`bold-${i}`}>* </b>
                        }
                        case TEMP_TAGS["*"]: {
                            const mdItem = getData(data, dataIndexes, "*");
                            return <MarkdownItalic key={`bold-${i}`}{...{mdItem}}/>
                        }
                        case TEMP_TAGS["```"]: {
                            const mdItem = getData(data, dataIndexes, "```");
                            return <MarkdownCode key={`code-${i}`}{...{mdItem}}/>
                        }
                        default:
                            return <>{val}</>
                    }
                })}
            </>
        );
    }, [text]);

    return content;
}
export default BuildMdContentV2;