require('dotenv').config({path: '.env.local'});

const http = require('http');
const OpenAI = require('openai');

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.REACT_APP_DEEP_SEEK_API_KEY,
});

const PORT = 4040;

const requestListener = async (req, res) => {
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3030'
    ];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (origin) {
        res.writeHead(403, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'Origin not allowed'}));
        return;
    }

    if (req.url === '/chat' && req.method === 'POST') {
        let body = '';
        let messages = [];
        let model = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                body = JSON.parse(body);
                messages = body.messages;
                model = body.model;

                const completion = await openai.chat.completions.create({
                    messages,
                    model,
                });
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(completion));
            } catch (error) {
                console.error(error);
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: 'Internal Server Error'}));
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'Not Found'}));
    }
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});