import {TEMP_TAGS} from "../constants/textTags";

export interface AdapterData {
    cuts: Record<string, string[]>;
    adoptedTextArr: string[];
}

const mdTagAdapter = (text: string): any => {
    const result: AdapterData = {
        cuts: {},
        adoptedTextArr: [text],
    };

    (Object.keys(TEMP_TAGS) as Array<keyof typeof TEMP_TAGS>).forEach((tag: keyof typeof TEMP_TAGS) => {
        const tagPlaceholder = TEMP_TAGS[tag];

        result.cuts[tagPlaceholder] = [];
        result.adoptedTextArr = result.adoptedTextArr.flatMap((val) => {

            let text = val;
            ///Table
            if (tag === "\n|") {
                text = text.replace(/(?:^|\n)\|([\s\S]*?)\|(?:\n\n|$)/g, (match, p1) => {
                    result.cuts[tagPlaceholder].push(`|${p1.trim()}|`);
                    return tagPlaceholder
                });
                return (text.split(new RegExp(`(${tagPlaceholder})`, 'g')) || []);
            } else if (tag === "***") {
                return text.split("***")
            }
            ////

            const splitInside = text.split(tag);
            splitInside.forEach((part, index) => {
                if (index % 2 === 1) {
                    result.cuts[tagPlaceholder].push(part);
                }
            });
            return splitInside.map((part, index) => (index % 2 === 1 ? tagPlaceholder : part));
        });
    });
    return result;
};

export default mdTagAdapter;