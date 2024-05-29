const dotenv = require('dotenv');

dotenv.config();

const _config = {
    mongoUrl: process.env.MONGO_URI,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    env: process.env.NODE_ENV,
}


const config = Object.freeze(_config);

module.exports = config