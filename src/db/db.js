const mongoose = require('mongoose');
const config = require('./config');


const connectDB = () => {
    mongoose
    .connect(config.mongoUrl)
    .then(() => {
        console.log(`${new Date()} : Successfully connected to the database`);
    })
    .catch((err) => {
        console.log(`${new Date()} : Error while connecting to the database! ${err}`);
    });
};


module.exports = connectDB;