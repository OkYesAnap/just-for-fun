const supabase = require('./supabase');

module.exports = async (req, res) => {
    try {
        const deleteMessages = JSON.parse(req.body);
        const deleteIds = deleteMessages.map(message => message.id);

        const {data, error} = await supabase
            .from('messages')
            .delete()
            .in('id', deleteIds);

        console.log(data, error);

        if (error !== null) {
            return res.status(404).json({message: 'Item not found'});
        }

        return res.status(200).json({message: 'Item deleted', data});
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({error: 'Unexpected error'});
    }
};