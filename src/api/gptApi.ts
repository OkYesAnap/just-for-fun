import engine from './engines.json';
import {Engines} from "../utils/constanst";

export enum EngineRole {
	assistant = "assistant",
	user = "user",
	system = "system",
	error = "error",
	inprogress = "inprogress"
}

const validEngineRoles = new Set(['system', 'assistant', 'user', 'function', 'tool', 'developer'])

export interface IEngineMessage {
	content: string,
	role: EngineRole,
	engine?: Engines
}

class ContextEngine {
	private context: IEngineMessage[];

	constructor() {
		this.context = [];
	}

	get() {
		return this.context;
	}

	update(message: IEngineMessage) {
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

export const contextEngine = new ContextEngine();

export const requestToEngine = async (message: IEngineMessage, params: { sysMessage: IEngineMessage[] }) => {

	const currentEngine = engine[message?.engine || "gpt"];

	contextEngine.update(message);
	const messageWithoutCustomRoles = contextEngine.get().filter((item: IEngineMessage) => validEngineRoles.has(item.role));
	const apiRequestBody = {
		"model": currentEngine.model,
		"messages": [
			...params.sysMessage,
			...messageWithoutCustomRoles,
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
		if (data?.error) {
			return contextEngine.update({
				content: data.error.message,
				role: EngineRole.error,
				engine: message.engine
			})
		}
		return contextEngine.update({...data.choices[0].message, engine: message.engine})

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
	return textTranscription;
};