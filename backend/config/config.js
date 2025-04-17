require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGO_URI;

const PORT = process.env.PORT;
const SECRET=process.env.SECRET;
const SUPABASE_URL=process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =process.env.SUPABASE_SERVICE_ROLE_KEY; 

module.exports = { MONGODB_URI, PORT, SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY }