const {OpenAI} = require('openai');

const fetchAI = async (aiEngine, body) => {
    return await aiEngine.chat.completions.create(body);
};

const aiEngines = {
    openAI: new OpenAI({
        apiKey: process.env.REACT_APP_GPT_API_KEY,
    }),
    deepSeek: new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.REACT_APP_DEEP_SEEK_API_KEY,
    })
}

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const data = JSON.parse(req.body);
            const {messages, model, engine} = data;
            let aiEngine;
            if (engine === 'gpt') {
                aiEngine = aiEngines.openAI
            } else if (engine === 'deepSeek') {
                aiEngine = aiEngines.deepSeek;
            } else {
                throw Error('No such engine');
            }
            const body = {messages, model};
            const completion = await fetchAI(aiEngine, body);
            res.status(200).json(completion);
        } catch (error) {
            if (error.error) {
                res.status(error.status).json({error: error.error.message});
            } else {
                res.status(500).json({error: error.message});
            }
        }
    } else {
        res.status(405).json({message: 'Method Not Allowed'});
    }
};