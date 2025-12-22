import {contextEngine, EngineRole, IEngineMessage} from "../api/gptApi";

export const useSupabaseGet = () => {

    return async (url: string): Promise<IEngineMessage[]> => {
        try {
            const response = await fetch(`/api/get${url}`, {
                method: "GET"
            });
            const data = await response.json();
            return contextEngine.updateAll(data);
        } catch (error) {
            return [{content: String(error), role: EngineRole.error}];
        }
    }
}