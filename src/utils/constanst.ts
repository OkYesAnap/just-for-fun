export const voiceEngines = {
	google: "Google Voice Input",
	gpt: "GPT Api Voice Input",
}

export type VoiceEnginesListType = typeof voiceEngines;

export type VoiceEngineSingleType = typeof voiceEngines[keyof typeof voiceEngines];