import React, {useEffect, useState} from "react";
import {MarkdownItemProps} from "./interfaces";
import {getMdContentIndexes} from "../../utils/getMdContentIndexes";
import BuildMdContent from "./BuildMdContent";

const MarkdownRenderer: React.FC<{ text: string }> = ({text}) => {
	const [codePartIndexes, setCodePartIndexes] = useState<MarkdownItemProps[]>([]);

	useEffect(() => {
		const code = getMdContentIndexes(text, '```');
		const bold = getMdContentIndexes(text, '**');
		const sorted = [...code, ...bold].sort((a, b) => a.begin! - b.begin!)
		setCodePartIndexes(sorted);
	}, [text]);

	return (
		<div>
			<BuildMdContent text={text} parsedArray={codePartIndexes}/>
		</div>
	)
};

export default MarkdownRenderer