const {createClient} = require('@supabase/supabase-js');

const API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;
const URL = process.env.REACT_APP_SUPABASE_URL;

module.exports = createClient(URL, API_KEY);

