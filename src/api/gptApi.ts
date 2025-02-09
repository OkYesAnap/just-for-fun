import engine from './engines.json';
import {Engines} from "../utils/constanst";

export enum gptRole {
	assistant = "assistant",
	user = "user",
	system = "system",
	error = "error",
	inprogress = "inprogress"
}

export interface IGptMessage {
	content: string,
	role: gptRole,
	engine?: Engines
}

class ContextGpt {
	private context: IGptMessage[];

	constructor() {
		this.context = [];
	}

	update(message: IGptMessage) {
		this.context.push(message);
		return this.context;
	}

	clear() {
		this.context = []
		return this.context;
	}

	deleteMessage(messageMNumber: number) {
		this.context.splice(messageMNumber, 1);
		return this.context;
	}
}

export const contextGPT = new ContextGpt();

export const requestToGpt = async (message: IGptMessage, params: { sysMessage: IGptMessage[] }) => {

	const currentEngine = engine[message?.engine || "gpt"];

	const apiRequestBody = {
		"model": currentEngine.model, //gpt-4-1106-preview
		"messages": [
			...params.sysMessage,
			...contextGPT.update(message),
		]
	}

	return await fetch(currentEngine.chatUrl,
		{
			method: "POST",
			headers: {
				"Authorization": "Bearer " + currentEngine.API_KEY,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(apiRequestBody)
		}).then((data) => {
		return data.json();
	}).then((data) => {
		const messages = data?.error ?
			contextGPT.update({content: data.error.message, role: gptRole.error}) :
			contextGPT.update(data.choices[0].message)
		return messages;
	})
};

export const sendAudioToServer = async (audioBlob: Blob) => {
	let textTranscription: string = '';
	const formData = new FormData();
	formData.append('model', 'whisper-1')
	formData.append('file', audioBlob);

	try {
		const response = await fetch(engine.gpt.audioUrl, {
			method: "POST",
			headers: {
				"Authorization": "Bearer " + engine.gpt.API_KEY,
			},
			body: formData,
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const responseData = await response.json();
		textTranscription = responseData.text;
	} catch (error) {
		console.error('Error uploading audio file:', error);
	}
	console.log(textTranscription);
	return textTranscription;
};