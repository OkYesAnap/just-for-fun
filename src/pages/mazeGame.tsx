import React, { useState, useEffect } from 'react';
import { contextGPT, gptRole, IGptMessage, requestToGpt } from '../api/gptApi';
import { ButtonAskBlock } from '../components/styled';

const messagesFromGpt = async (params: any) => {
	const result = await requestToGpt({
		content: '',
		role: gptRole.user
	}, params);
	return result;
};

const MazeGame = (params: { model: string, sysMessage: IGptMessage[] }) => {
	const [messages, setMessages] = useState<IGptMessage[]>([]);
	const [maze, setMaze] = useState<any>([]);
	const [askInProgress, setAskInProgress] = useState(false);

	useEffect(() => {
		// @ts-ignore
		setMaze(messages[1]);
		console.log(maze);
	}, [messages.length]);

	const askGpt = async () => {
		contextGPT.clear();
		setAskInProgress(true);
		setMessages([{
			content: 'I am generating',
			role: gptRole.inprogress
		}]);
		const message = await messagesFromGpt(params);
		setMessages(message);

		setAskInProgress(false);
	};
	return (<>
		Hello {askInProgress ? 'Generating' : ''}
		<ButtonAskBlock onClick={askGpt} disabled={askInProgress} className={'text-props'}>Start generating</ButtonAskBlock>
		<div>
			{maze?.content}
		</div>
	</>);
};
export default MazeGame;