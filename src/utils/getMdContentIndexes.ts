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
			eolIndex = text.indexOf('\n', index);
			currTag.title = text.slice(currTag.begin + markupTag.length, eolIndex)
			currTag.tag = markupTag;
		} else {
			if (currTag) {
				currTag.end = index + markupTag.length;
				currTag.content = text.slice(eolIndex + 1, currTag.end - markupTag.length)
			}
		}
		indexCounter++;
		index = text.indexOf(markupTag, index + 1);
	}
	return indexes
};

export {getMdContentIndexes}