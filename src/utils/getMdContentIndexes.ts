import {defaultMdItem, MarkdownItemProps} from "../components/messagesBlock/interfaces";

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
			if(markupTag === '```' || markupTag === '###') {
				eolIndex = text.indexOf('\n', index);
				currTag.title = text.slice(currTag.begin, eolIndex);
				if(markupTag === '###') {
					indexCounter--
					currTag.end = eolIndex;
				}
			}
			currTag.tag = markupTag;
		} else {
			if (currTag) {
				currTag.end = index + markupTag.length;
				if(markupTag === '```') {
					currTag.content = text.slice(eolIndex + 1, currTag.end)
				} else {
					currTag.content = text.slice(currTag.begin!, currTag.end)
				}
			}
		}
		indexCounter++;
		index = text.indexOf(markupTag, index + markupTag.length);
	}
	return indexes
};

export {getMdContentIndexes}