import {TAG, TEMP_TAGS} from "../constants/textTags";

export interface AdapterData {
    cuts: Record<string, string[]>;
    adoptedTextArr: string[];
}

const mdTagAdapter = (text: string): any => {
    const result: AdapterData = {
        cuts: {},
        adoptedTextArr: [text],
    };

    (Object.keys(TAG) as Array<keyof typeof TAG>).forEach((tag: keyof typeof TAG, index) => {
        const tagPlaceholder = TEMP_TAGS[TAG[tag]];

        result.cuts[tagPlaceholder] = [];
        result.adoptedTextArr = result.adoptedTextArr.flatMap((val) => {

            let text = val;
            ///Table
            if (TAG[tag] === TAG.table) {
                text = text.replace(/(?:^|\n)\|([\s\S]*?)\|(?:\n\n|$)/g, (match, p1) => {
                    result.cuts[tagPlaceholder].push(`|${p1.trim()}|`);
                    return tagPlaceholder
                });
                return (text.split(new RegExp(`(${tagPlaceholder})`, 'g')) || []);
            } else if (TAG[tag] === TAG.starThree) {
                return text.split(TAG.starThree)
            }
            ////

            const splitInside = text.split(TAG[tag]);
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