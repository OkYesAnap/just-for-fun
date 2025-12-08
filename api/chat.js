const {OpenAI} = require('openai');

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.REACT_APP_DEEP_SEEK_API_KEY,
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const data = JSON.parse(req.body);
        const completion = await openai.chat.completions.create({
            messages: data.messages,
            model: data.model,
        });
        res.status(200).json(completion);
    } else {
        res.status(405).json({message: 'Method Not Allowed'});
    }
};