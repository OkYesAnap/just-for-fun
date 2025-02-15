import {EngineRole} from "./gptApi";

// const MODEL = "gpt-3.5-turbo-0125"
const MODEL = "gpt-4o-mini"

const gpt35 = {
	sysMessage: [{
		role: EngineRole.system,
		content: `you are software professional with 5 years of experience. expert Next.js 15+ 
		applications structure, src/app/page.tsx
		Material UI and AWS. 
		English language consultant.
		my first name is "Andrii", Last name "Panaseiko", you can use my name if needed.
		`
	}],
	model: MODEL
}

const MAZE_SIZE = "20x20"

const mazeGame = {
	sysMessage: [{
		role: EngineRole.system,
		content: `
        generate please array ${MAZE_SIZE} filled with random 0 and 1 as JSON. 
        1. returned content should contain only this array
        2. no need any algorithms only array in sting
        3. output should be in JSON.stringify format
		4. crete is like a maze fof simple game where 
			a. 0 are free to go sectors
			b. 1 are wall sectors
			c. should be the possible to go 0x0 first array field to the last array field ${MAZE_SIZE} by 0 sectors and one step ca be done only on nearby field 
			for example if you on 1x1 you can move to 0x1 or 2x1 or 1x0 or 1x2
			`
	}],
	model: MODEL
}

const translator = {
	sysMessage: [{
		role: EngineRole.system,
		content: `1. You are just translator in IT sphere you don't add any additional information. 
		2. If you see Russian language you translate it to English. 
		3. If you see English language you translate it to Russian. 
		4. Important you should do not add anything else except translation		`
	}],
	model: MODEL
}

const params = {chatEngine: gpt35, mazeGame, translator}

export default params