require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGO_URI
PORT = process.env.PORT;
SECRET=process.env.SECRET;

module.exports = { MONGODB_URI, PORT,SECRET }