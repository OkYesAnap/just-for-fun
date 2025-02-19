import React from "react";
import {MarkdownItemProps} from "./interfaces";
import MarkdownCode from "./MarkdownCode";
import MarkdownBold from "./MarkdownBold";

const BuildMdContent: React.FC<{ text: string, parsedArray: MarkdownItemProps[] }> = ({text, parsedArray}) => {
	const lastIndex = parsedArray.length - 1;
	if (!parsedArray.length) return <>{text}</>;

	return (
		<>
			{parsedArray.map((mdItem, i) => {
				const content: JSX.Element[] = [];
				if (i === 0) {
					content.push(<span>{text.slice(0, mdItem.begin!)}</span>);
				} else {
					content.push(<span>{text.slice(parsedArray[i - 1].end!, mdItem.begin!)}</span>)
				}
				switch (mdItem.tag) {
					case '```': {
						content.push(<MarkdownCode {...{mdItem}}/>);
						break;
					}
					case '**': {
						content.push(<MarkdownBold {...{mdItem}}/>);
						break;
					}
				}
				if (i === lastIndex) {
					content.push(<div>{text.slice(mdItem.end!, text.length)}</div>);
				}
				return content;
			})
			}</>
	)
};

export default BuildMdContent;