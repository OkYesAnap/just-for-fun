const supabase = require('./supabase');

const getId = (response) => response.data[0].id;

const createMessagesArray = ({messages, engine_id, model_id, chat_id, roles}) => {
    return messages.map((message) => {
        const {role, content} = message;
        const role_id = roles.find((roleData) => roleData.role_name === role).id;
        return {engine_id, model_id, chat_id, role_id, content}
    })
};

module.exports = async (req, res) => {
    const reqBody = JSON.parse(req.body);
    const {engine, model, messages} = reqBody;
    const {chatName} = reqBody.params;
    try {

        const [engineResp, modelResp, chatResp, roleResp] = await Promise.all([
            supabase.from('engines').select('id').eq('engine_name', engine),
            supabase.from('models').select('id').eq('model_name', model),
            supabase.from('chats').select('id').eq('chat_name', chatName),
            supabase.from('roles').select('*')
        ]);

        const [engine_id, model_id, chat_id, roles] = [getId(engineResp), getId(modelResp), getId(chatResp), roleResp.data];

        const DBData = createMessagesArray({messages, engine_id, model_id, chat_id, roles});

        const {data, error} = await supabase
            .from('messages')
            .insert(DBData);

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({error: 'Error fetching data'})
        }

        return res.status(200).json(data)
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({error: 'Unexpected error'})
    }
    return res.status(500).json({error: 'Unexpected error'})
};