const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const config = require('../db/config');

const createUser = async (req, res) => {
    const { name, username, password } = req.body;
    console.log(req.body);
    let hashedPass;

    try {
        const saltRounds = 10;
        hashedPass = await bcrypt.hash(password, saltRounds);
    } catch (error) {
        return res.status(500).json({msg: 'cannot hash password'});
    }

    try {
        const user = await User.create({
            name: name,
            username: username,
            password: hashedPass
        });
        if(user) {
            return res.status(201).json(user);
        }
    } catch (error) {
        return res.status(500).json({msg: 'error while creating user'});
    }
}


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    let hashPass;
    try {
        const user = await User.findOne({username});
        const response = await bcrypt.compare(password, user.password);
        hashPass = user.password;
        if(!response) {
            res.status(403).json({msg: 'wrong password'});
        }
    } catch (error) {
        res.json({msg: "error comparing"});
    }

    try {
        const user = await User.findOne({username: username, password: hashPass});
        console.log(user);
        if(user) {
            const token = jwt.sign({
                data: {
                    _id: user._id,
                    username: username
                }
            }, config.jwtSecret, {
                expiresIn: '7d'
            });
            res.status(200).json(token);
        }
    } catch (error) {
        res.status(404).json({msg: 'user not found'});
    }
}

const deleteUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const id = jwt.verify(token, config.jwtSecret).data._id;
    const reqId = req.params.userId;
    try {
        if(id==reqId) {
            const response = await User.findByIdAndDelete(id);
            if(response) {
                res.status(200).json({msg: 'deleted successfully'});
            }
        }
    } catch (error) {
        res.json({msg: 'error deleting user'});
    }
}


module.exports = { createUser, loginUser, deleteUser };