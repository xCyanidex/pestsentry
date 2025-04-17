const jwt = require('jsonwebtoken');
const User=require('../models/user');
const config=require('../config/config');
const {getTokenFrom}=require('../utils/token')


const authenticate = async (req, res, next) => {
    
    try {
        
        const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET)
        // console.log(decodedToken)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)
        // console.log(user);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = authenticate;