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
			if(markupTag === '```') {
				eolIndex = text.indexOf('\n', index);
				currTag.title = text.slice(currTag.begin, eolIndex);
			}
			currTag.tag = markupTag;
		} else {
			if (currTag) {
				currTag.end = index;
				currTag.content = text.slice(eolIndex + 1, currTag.end)
			}
		}
		indexCounter++;
		index = text.indexOf(markupTag, index + 1);
	}
	return indexes
};

export {getMdContentIndexes}