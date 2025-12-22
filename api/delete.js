const supabase = require('./supabase');

module.exports = async (req, res) => {
    try {
        const {id} = JSON.parse(req.body);

        const {data, error} = await supabase
            .from('messages')
            .delete()
            .eq('id', id);

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