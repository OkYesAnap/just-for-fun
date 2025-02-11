export enum Engines {
	GPT = "gpt",
	DEEP_SEEK = "deepSeek"
}

export const defaultTextInputSize = 2;

export const voiceEngines = {
	google: "Google Voice Input",
	gpt: "GPT Api Voice Input",
}

export type VoiceEngineSingleType = typeof voiceEngines[keyof typeof voiceEngines];