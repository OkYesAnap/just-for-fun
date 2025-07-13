import {defaultMdItem, MarkdownItemProps} from "../components/messagesBlock/interfaces";
import {tag} from "../constants/textTags";

const getMdContentIndexes = (text: string, markupTag: string) => {
    const indexes: MarkdownItemProps[] = [];
    let index = text.indexOf(markupTag);
    let indexCounter = 0;
    let eolIndex = 0;
    let currTag;

    while (index !== -1) {
        if (!(indexCounter % 2)) {
            indexes.push({...defaultMdItem});
            currTag = indexes[indexes.length - 1];
            currTag.begin = index;
            if (markupTag === tag.code || markupTag === tag.head) {
                eolIndex = text.indexOf('\n', index);
                currTag.title = text.slice(currTag.begin, eolIndex);
                if (markupTag === tag.head) {
                    indexCounter--;
                    currTag.end = eolIndex;
                }
            }
            currTag.tag = markupTag;
        } else if (currTag) {
            currTag.end = index + markupTag.length;
            if (markupTag === tag.code) {
                currTag.content = text.slice(eolIndex + 1, currTag.end)
            } else {
                currTag.content = text.slice(currTag.begin! + markupTag.length, currTag.end - markupTag.length);
                if (currTag.content.indexOf('"') > -1) {
                    currTag.content = currTag.content.replace(/"/g, '');
                }
            }

        }
        indexCounter++;
        index = text.indexOf(markupTag, index + markupTag.length);
    }
    return indexes
};

export {getMdContentIndexes}