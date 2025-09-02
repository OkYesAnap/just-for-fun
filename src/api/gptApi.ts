import engine from './engines.json';
import {ApiKeyInstructions, Engines, ModelTypes} from "../constants/constants";

const keys = {
    gpt: process.env.REACT_APP_GPT_API_KEY,
    deepSeek: process.env.REACT_APP_DEEP_SEEK_API_KEY
}

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
    engine?: Engines,
    model?: ModelTypes,
    reasoning_content?: string
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
        this.context = [];
        return this.context;
    }

    deleteMessage(messageMNumber: number) {
        this.context.splice(messageMNumber, 1);
        return this.context;
    }
}

export const contextEngine = new ContextEngine();

export const requestToEngine = async (params: { sysMessage: IEngineMessage[] }) => {

    const messages = contextEngine.get();
    const lastMessage = messages[messages.length - 1];
    const currentEngine = engine[lastMessage?.engine || "gpt"];
    const messageWithoutCustomRoles = contextEngine.get().filter((item: IEngineMessage) => validEngineRoles.has(item.role));
    const apiRequestBody = {
        "model": lastMessage.model,
        "messages": [
            ...params.sysMessage,
            ...messageWithoutCustomRoles,
        ]
    };
    try {
        const response = await fetch(currentEngine.chatUrl,
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + keys[lastMessage?.engine || "gpt"],
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });

        const data = await response.json();

        let content = data.error?.message;

        if (response.status === 401) {
            content += ApiKeyInstructions;
        }

        if (data?.error) {
            return contextEngine.update({
                content,
                role: EngineRole.error,
                engine: lastMessage.engine
            })
        }
        const newMessage = data.choices[0].message;
        delete newMessage.reasoning_content;
        return contextEngine.update({...newMessage, engine: lastMessage.engine});

    } catch (error) {
        let errorMessage: string;
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = "Unknown error!"
        }
        return contextEngine.update({
            content: errorMessage,
            role: EngineRole.error,
            engine: lastMessage.engine
        })
    }
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
                "Authorization": "Bearer " + keys.gpt,
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