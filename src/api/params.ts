import {gptRole} from "./gptApi";

const gpt35 = {
    sysMessage: [{
        role: gptRole.system,
        content: "you are software professional with 5 years of experience. expert React, Ant Design and AWS"
    }],
    model: "gpt-3.5-turbo-1106"
}

const mazeGame = {
    sysMessage: [{
        role: gptRole.system,
        content: `
        generate please array 10x10 filled with random 0 and 1 for JS. 
        1. returned content should contain only this array
        2. no need any algorithms only array in sting
        3. output should be in JSON.stringify format`
    }],
    model: "gpt-3.5-turbo-1106"
}

const params = {gpt35, mazeGame}

export default params