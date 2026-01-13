const supabase = require('./supabase');

module.exports = async (req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const engine = urlObj.searchParams.get('engine');
    const model = urlObj.searchParams.get('model');
    const chat = urlObj.searchParams.get('chat');
    try {
        const [engines, models, chats] = await Promise.all([
            supabase.from('engines').select('*').eq('engine_name', engine),
            supabase.from('models').select('*').eq('model_name', model),
            supabase.from('chats').select('*').eq('chat_name', chat),
        ]);
        if (engines.data.length === 0) {
            const {engineData, dataError} = await supabase
                .from('engines')
                .insert([
                    {engine_name: engine}
                ]);
        }
        if (models.data.length === 0) {
            const {modelData, dataError} = await supabase
                .from('models')
                .insert([
                    {model_name: model}
                ]);
        }
        if (chats.data.length === 0) {
            const {chatsData, dataError} = await supabase
                .from('chats')
                .insert([
                    {chat_name: chat}
                ]);
        }

        const {data, error} = await supabase
            .from('get_messages')
            .select(`*`)
            .eq("engine", engine)
            .eq("model", model)
            .eq("chat", chat)
            .order('id');

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({error: 'Error fetching data'})
        }

        return res.status(200).json(data)
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({error: 'Unexpected error'})
    }
};