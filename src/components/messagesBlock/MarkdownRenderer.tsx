import React, {useEffect, useState} from "react";
import {MarkdownItemProps} from "./interfaces";
import {getMdContentIndexes} from "../../utils/getMdContentIndexes";
import BuildMdContent from "./BuildMdContent";

const MarkdownRenderer: React.FC<{ text: string }> = ({text}) => {
	const [codePartIndexes, setCodePartIndexes] = useState<MarkdownItemProps[]>([]);

	useEffect(() => {
		const code = getMdContentIndexes(text, '```');
		const bold = getMdContentIndexes(text, '**');
		const thirdHeading = getMdContentIndexes(text, '###');
		const sorted = [
			...code,
			...bold,
			...thirdHeading
		].sort((a, b) => a.begin! - b.begin!);

		const clearedInterceptions = sorted.reduce((accum: any, item) => {
			if (accum.length < 1) {
				accum.push(item)
				return accum
			}
			if (item.begin! >= accum[accum.length - 1]?.end) {
				accum.push(item);
			}
			return accum;
		}, [])

		setCodePartIndexes(clearedInterceptions);
	}, [text]);

	return (
		<div>
			<BuildMdContent text={text} parsedArray={codePartIndexes}/>
		</div>
	)
};

export default MarkdownRenderer