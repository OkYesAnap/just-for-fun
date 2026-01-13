import React, {memo, useCallback, useState} from 'react';
import {contextEngine, IEngineMessage, requestToEngine} from '../api/gptApi';
import InputButton from '../components/inputBlock/InputButton';
import styled from "styled-components";

const messagesFromGpt = async (params: any) => {
    const result = await requestToEngine(params);
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
    params: { model?: string, sysMessage: IEngineMessage[] },
    setAskInProgress: React.Dispatch<React.SetStateAction<boolean>>,
    setMaze: React.Dispatch<React.SetStateAction<Array<Array<number>>>>
}): Promise<void> => {
    contextEngine.clear();
    setAskInProgress(true);
    const message = await messagesFromGpt(params);
    setMaze(strToMazeArray(message[1].content));
    setAskInProgress(false);
};

interface IMazeCellStyled {
    type: number;
}

const MazeCellStyled = styled.div<IMazeCellStyled>`
    width: 100px;
    height: 100px;
    background-color: ${({type}) => !!type ? "blue" : "green"};
`;

const Cells = ({line, y}: { line: Array<number>, y: number }) => {
    return (<>{line.map((cell: number, x: number) => {
            const cellId = `Cell=${y}x${x}`;
            return <MazeCellStyled type={cell} key={cellId}/>
        })}
        </>
    )
}

const MazeLineStyled = styled.div`
    width: 100%;
`

interface IGridContainer {
    $mazesize: number
}

const GridContainerStyled = styled.div<IGridContainer>`
    display: grid;
    grid-template-columns: repeat(${
            ({$mazesize}) => $mazesize
    }, 100px); /* 10 колонок по 100px */
    //grid-template-rows: repeat(10, 100px); /* 10 строк по 100px */
`;

const Maze = ({maze}: { maze: Array<Array<number>> }) => {
    return (<GridContainerStyled $mazesize={maze.length}>{
        maze.map((line: Array<number>, y: number) => {
            const lineId = `line-${y}`;
            return <MazeLineStyled key={lineId}><Cells {...{line, y}}/></MazeLineStyled>
        })
    }</GridContainerStyled>)
}

const MazeGame = (params: { model?: string, sysMessage: IEngineMessage[] }) => {
    const [maze, setMaze] = useState<Array<Array<number>>>([]);
    const [askInProgress, setAskInProgress] = useState<boolean>(false);
    const getGeneratedData = useCallback(() => {
        askGpt({params, setAskInProgress, setMaze});
    }, [params])

    return (<>
        Hello {askInProgress ? 'Generating' : ''}
        <InputButton onClick={getGeneratedData} disabled={askInProgress}>
            Start generating
        </InputButton>
        <Maze {...{maze}}/>
    </>);
};
export default memo(MazeGame);