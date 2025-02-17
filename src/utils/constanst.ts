interface RouteParams {
	route: string;
	title: string;
}

export const routeHeader: RouteParams[] = [
	{
		title: "Developer",
		route: "chat-engine",
	},
	{
		title: "Maze Game",
		route: "maze-game"
	},
	{
		title: "Translator",
		route: "translator"
	},
	{
		title: "TestPage",
		route: "test-page"
	}
]

export const headerLinks = new Set(["chat-engine", "translator"]);

export enum Engines {
	GPT = "gpt",
	DEEP_SEEK = "deepSeek"
}

export type ModelTypes = "gpt-4o-mini" | "gpt-4o" | "deepseek-chat" | "deepseek-reasoner" | ""

type EngineModelsType = {
	[key in Engines]: ModelTypes[];
}

export const Models: EngineModelsType = {
	[Engines.GPT]: ["gpt-4o-mini", "gpt-4o"],
	[Engines.DEEP_SEEK]: ["deepseek-chat", "deepseek-reasoner"]
}

export const defaultTextInputSize = 2;

export interface IVoiceEngines {
	google: string;
	gpt: string
}

export const voiceEngines: IVoiceEngines = {
	google: "Google Voice Input",
	gpt: "GPT Api Voice Input",
}

export type VoiceEngineSingleType = typeof voiceEngines[keyof typeof voiceEngines];