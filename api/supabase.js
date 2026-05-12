const {createClient} = require('@supabase/supabase-js');

const API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;
const URL = process.env.REACT_APP_SUPABASE_URL;

module.exports = (req = null) => {
    const options = {};

    const userToken = req?.headers['authorization'];

    if (userToken) {
        options.global = {
            headers: {
                Authorization: `Bearer ${userToken.replace('Bearer ', '')}`
            }
        };
    }

    return createClient(URL, API_KEY, options);
};