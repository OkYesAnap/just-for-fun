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
                        case TEMP_TAGS[TAG.headOne]: {
                            const mdItem = getData(data, dataIndexes, TAG.headOne);
                            return <h1 key={`h1-${i}`}>{mdItem}</h1>
                        }
                        case TEMP_TAGS[TAG.headTwo]: {
                            const mdItem = getData(data, dataIndexes, TAG.headTwo);
                            return <h2 key={`h2-${i}`}>{mdItem}</h2>
                        }
                        case TEMP_TAGS[TAG.headThree]: {
                            const mdItem = getData(data, dataIndexes, TAG.headThree);
                            return <h3 key={`h3-${i}`}>{mdItem}</h3>
                        }
                        case TEMP_TAGS[TAG.headFour]: {
                            const mdItem = getData(data, dataIndexes, TAG.headFour);
                            return <h4 key={`h4-${i}`}>{mdItem}</h4>
                        }
                        case TEMP_TAGS[TAG.headFive]: {
                            const mdItem = getData(data, dataIndexes, TAG.headFive);
                            return <h5 key={`h5-${i}`}>{mdItem}</h5>
                        }
                        case TEMP_TAGS[TAG.headSix]: {
                            const mdItem = getData(data, dataIndexes, TAG.headSix);
                            return <h6 key={`h6-${i}`}>{mdItem}</h6>
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