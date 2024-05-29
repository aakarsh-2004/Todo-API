const jwt = require('jsonwebtoken');
const config = require('../db/config');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedJwt = jwt.verify(token, config.jwtSecret);
        const username = decodedJwt.data.username;
        const id = decodedJwt.data._id;
        const response = await User.findById(id);
        if(response) {
            req.headers.userId = id;
            req.headers.token = token;
            next();
        } else {
            res.status(404).json({msg: 'user not found or invalid token'})
        }
    } catch (error) {
        res.json({msg: 'error while verifying'});
    }
}

module.exports = authenticate;