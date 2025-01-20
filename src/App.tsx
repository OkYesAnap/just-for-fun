import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import HatPage from './pages/СhatPage';
import Main from './pages/Main';
import Error404 from './pages/Error404';
import MazeGame from "./pages/MazeGame";
import TestPage from "./pages/TestPage"
import params from '../src/api/params'
import params4 from '../src/api/params4'

function App() {
	const {gpt35, mazeGame, translator} = params
	const {gpt4} = params4
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main/>}/>
					<Route path="/gpt-chat-3-5" element={<HatPage {...gpt35}/>}/>
					<Route path="/gpt-chat-4" element={<HatPage {...gpt4}/>}/>
					<Route path="/maze-game" element={<MazeGame {...mazeGame}/>}/>
					<Route path="/translator" element={<HatPage {...translator}/>}/>
					<Route path="/testPage" element={<TestPage/>}/>
					<Route path="*" element={<Error404/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
