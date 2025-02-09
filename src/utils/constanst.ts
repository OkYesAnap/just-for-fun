export type engineType = "gpt" | "deepSeek"

export const voiceEngines = {
	google: "Google Voice Input",
	gpt: "GPT Api Voice Input",
}

export type VoiceEngineSingleType = typeof voiceEngines[keyof typeof voiceEngines];