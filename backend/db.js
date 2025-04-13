const config = require('./config/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const connectToDatabase = async () => {

    console.log(config);
    try {
        logger.info('connecting to', config.MONGODB_URI)
        await mongoose.connect(config.MONGODB_URI)
        logger.info('connected to MongoDB')
    } catch (error) {
        logger.error('error connecting to MongoDB:', error.message)
        process.exit(1) // Optional: Exit the process if connection fails
    }
}

module.exports = connectToDatabase
