import {contextEngine, EngineRole, IEngineMessage} from "../../api/gptApi";
import React, {useContext, useEffect, useState} from "react";
import EnginePrefix from './EnginePrefix';
import styled from 'styled-components';
import {ChatContext} from "../../context/ChatContext";

const setBackgroundColor = ($role: EngineRole) => {
	if ($role === EngineRole.user) {
		return "#414158";
	} else if ($role === EngineRole.error) {
		return "red";
	}
	return 'rgba(0, 0, 0, 0)'
}

interface MessageBlockProps {
	$role: EngineRole;
	$engine?: string;
}

export const MessageBlock = styled.div<MessageBlockProps>`
  margin: ${({$role}) => ($role === 'user' ? '10px 10vmin 10px 20px' : '10px auto 10px 10vmin')};
  text-align: left;
  align-self: flex-end;
  width: fit-content;
  background-color: ${({$role}) => setBackgroundColor($role)};
  padding: 20px;
  border-radius: 10px;
  font-size: clamp(10px, 2.5vh, 20px);
  white-space: pre-wrap;
  animation: fadeIn ${({$role}) => $role === EngineRole.user ? '500ms' : '1000ms'} ease-in;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`

interface MessageProps {
	i: number,
	message: IEngineMessage,
}

interface CodeMarkdownProps {
	tag: string,
	begin: number | null,
	end: number | null,
	title?: string,
	content?: string
}

const defaultItem = {begin: null, end: null, tag: ''};


const getCodeIndexes = (text: string, markupTag: string) => {
	const indexes: CodeMarkdownProps[] = [];
	let index = text.indexOf(markupTag);
	let indexCounter = 0;
	let eolIndex = 0;
	let currTag;

	while (index !== -1) {
		if (!(indexCounter % 2)) {
			indexes.push({...defaultItem});
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

const BuildContent: React.FC<{ text: string, parsedArray: CodeMarkdownProps[] }> = ({text, parsedArray}) => {
	const lastIndex = parsedArray.length - 1;
	if (!parsedArray.length) return <>{text}</>;

	return (
		<>
			{parsedArray.map((tag, i) => {
				const content: JSX.Element[] = [];
				if (i === 0) {
					content.push(<div>{text.slice(0, tag.begin!)}</div>);
				} else {
					content.push(<div>{text.slice(parsedArray[i - 1].end!, tag.begin!)}</div>)
				}
				content.push(<div
					style={{fontSize: "16px", backgroundColor: "black", padding: '20px', borderRadius: "20px"}}>{tag.title!.toUpperCase()} {tag.content}</div>);
				if (i === lastIndex) {
					content.push(<div>{text.slice(tag.end!, text.length)}</div>);
				}
				return content;
			})
			}</>
	)
};

const ParseMarkdown: React.FC<{ text: string }> = ({text}) => {
	const [codePartIndexes, setCodePartIndexes] = useState<CodeMarkdownProps[]>([]);

	useEffect(() => {
		setCodePartIndexes(getCodeIndexes(text, '```'));
	}, [text]);

	return (
		<div>
			<BuildContent text={text} parsedArray={codePartIndexes}/>
		</div>
	)
}

const Message: React.FC<MessageProps> = ({i, message}) => {

	const {setMessages} = useContext(ChatContext);

	const handleDeleteMessage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, messageNumber: number) => {
		if (e.ctrlKey || e.metaKey) {
			const messages = contextEngine.deleteMessage(messageNumber);
			setMessages([...messages]);
		}
	};
	const isInProgress = message.role === EngineRole.inprogress;
	const isValidRole = !(message.role === EngineRole.user);
	return (<MessageBlock
		$role={message.role}
		$engine={message.engine}
		onClick={(e) => handleDeleteMessage(e, i)}>
		{(isValidRole || isInProgress) && <EnginePrefix {...{message}}/>}
		<div>
			<ParseMarkdown text={message.content}/>
			{/*{message.content}*/}
		</div>
	</MessageBlock>)
}

export default Message;