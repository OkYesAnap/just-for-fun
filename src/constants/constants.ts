interface RouteParams {
    route: string;
    title: string;
}

export const routeHeader: RouteParams[] = [
    {
        title: 'Developer',
        route: 'chat-engine',
    },
    {
        title: 'Maze Game',
        route: 'maze-game'
    },
    {
        title: 'Translator',
        route: 'translator'
    },
    {
        title: 'Prompt',
        route: 'prompt'
    },
    {
        title: 'TestPage',
        route: 'test-page'
    }
];

export const headerLinks = new Set(['chat-engine', 'translator', 'prompt']);

export enum Engines {
    GPT = 'gpt',
    DEEP_SEEK = 'deepSeek'
}

export type ModelTypes = 'gpt-5' |
    'gpt-5-mini' |
    'gpt-5-nano' |
    'gpt-5-chat-latest' |
    'gpt-5-codex' |
    'gpt-5-pro' |
    'gpt-4.1' |
    'gpt-4.1-mini' |
    'gpt-4.1-nano' |
    'gpt-4o-mini' |
    'gpt-4o' |
    'deepseek-chat' |
    'deepseek-reasoner' |
    ''

type EngineModelsType = {
    [key in Engines]: ModelTypes[];
}

export const Models: EngineModelsType = {
    [Engines.GPT]: ['gpt-5-nano', 'gpt-5', 'gpt-5-mini', 'gpt-5-chat-latest', 'gpt-5-codex',
        'gpt-5-pro', 'gpt-4.1-nano', 'gpt-4.1-mini', 'gpt-4.1', 'gpt-4o-mini', 'gpt-4o'],
    [Engines.DEEP_SEEK]: ['deepseek-chat', 'deepseek-reasoner']
};

export const defaultTextInputSize = 2;

export interface IVoiceEngines {
    google: string;
    gpt: string;
}

export const voiceEngines: IVoiceEngines = {
    google: 'Google Voice Input',
    gpt: 'GPT Api Voice Input',
};

export type VoiceEngineSingleType = typeof voiceEngines[keyof typeof voiceEngines];

export const ApiKeyInstructions = `
If you are experiencing issues with your API key, please follow these steps:

1. Rename the file **.env.local.example** to **.env.local**.
2. Inside the file, add your correct API key in the appropriate lines:
   - For OpenAI, use: **REACT_APP_GPT_API_KEY=xxxxxxxxxxxx**
   - For DeepSeek, use: **REACT_APP_DEEP_SEEK_API_KEY=xxxxxxxxxxxx**

You can find your API key in your personal engine platform at one of the following links:

- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [DeepSeek API Keys](https://platform.deepseek.com/api_keys)

By following these steps, you should be able to resolve any issues related to your API key.`;