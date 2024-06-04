import {gptRole} from "./gptApi";

const MODEL = "gpt-3.5-turbo-0125"

const gpt35 = {
	sysMessage: [{
		role: gptRole.system,
		content: "you are software professional with 5 years of experience. expert React, Ant Design and AWS"
	}],
	model: MODEL
}

const mazeGame = {
	sysMessage: [{
		role: gptRole.system,
		content: `
        generate please array 10x10 filled with random 0 and 1 as JSON. 
        1. returned content should contain only this array
        2. no need any algorithms only array in sting
        3. output should be in JSON.stringify format`
	}],
	model: MODEL
}

const translator = {
	sysMessage: [{
		role: gptRole.system,
		content: "1. You are just translator you don't add any additional information. 2. If you see Russian language you translate it to English. 3. If you see English language you translate it to Russian. 4. Important you should do not add anything else except translation"
	}],
	model: MODEL
}

const params = {gpt35, mazeGame, translator}

export default params