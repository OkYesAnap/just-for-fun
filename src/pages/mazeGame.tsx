import React, {useState, useEffect, useCallback} from 'react';
import {contextGPT, gptRole, IGptMessage, requestToGpt} from '../api/gptApi';
import {ButtonAskBlock} from '../components/styled';

const messagesFromGpt = async (params: any) => {
	const result = await requestToGpt({
		content: '',
		role: gptRole.user
	}, params);
	return result;
};

const strToMazeArray = (content: string): Array<Array<number>> => {
	const begin = content.indexOf('[');
	const end = content.lastIndexOf(']');
	const getArray = content.slice(begin, end + 1);
	return JSON.parse(getArray) as Array<Array<number>>;
}

const askGpt = async ({
	                      params,
	                      setAskInProgress,
	                      setMaze
                      }: {
	params: { model: string, sysMessage: IGptMessage[] },
	setAskInProgress: React.Dispatch<React.SetStateAction<boolean>>,
	setMaze: React.Dispatch<React.SetStateAction<Array<Array<number>>>>
}): Promise<void> => {
	contextGPT.clear();
	setAskInProgress(true);
	const message = await messagesFromGpt(params);
	setMaze(strToMazeArray(message[1].content));
	setAskInProgress(false);
};

const MazeGame = (params: { model: string, sysMessage: IGptMessage[] }) => {
	const [maze, setMaze] = useState<Array<Array<number>>>([]);
	const [askInProgress, setAskInProgress] = useState<boolean>(false);
	console.log('Rerender');
	const getGeneratedData = useCallback(() => {
		askGpt({params, setAskInProgress, setMaze});
	}, [params])

	useEffect(() => {
		getGeneratedData()
	}, [getGeneratedData]);

	return (<>
		Hello {askInProgress ? 'Generating' : ''}
		<ButtonAskBlock onClick={getGeneratedData} disabled={askInProgress} className={'text-props'}>Start
			generating</ButtonAskBlock>
		{maze.map((line: Array<number>, x: number) => {
			const colId = `line-${x}`;
			return (<div id={colId}>
					{line.map((row: number, y: number) => {
						const rowId = `cell=y-${y}_x-${x}`
						return (
							<span id={rowId}>{row}</span>
						)
					})}
				</div>
			)
		})}
	</>);
};
export default MazeGame;