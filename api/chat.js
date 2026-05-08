const {OpenAI} = require('openai');

const gptContentAdapter = (messages) => messages.map((item) => {
    if (item.imageBase64) {
        return {
            role: item.role,
            content: [
                {
                    "type": "text",
                    "text": item.content,
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": item.imageBase64
                    }
                },
            ]
        };
    } else {
        return {
            role: item.role,
            content: item.content
        }
    }
});
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
            let {messages, model, engine} = data;
            if (engine === 'gpt') {
                engine = aiEngines.openAI;
                messages = gptContentAdapter(messages);
            } else if (engine === 'deepSeek') {
                engine = aiEngines.deepSeek;
            } else {
                throw Error('No such engine');
            }
            const body = {messages, model};
            const completion = await fetchAI(engine, body);
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