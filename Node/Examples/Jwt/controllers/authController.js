const data = {};
data.users = require('../models/users.json');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({'message': 'Username and password are required !'});

    let user = data.users.find( person => person.username === username);
    if(user) return res.status(409).json({ 'message': 'Username invalid !' });

    try{
        let hashedPwd = await bcrypt.hash(password, 10);
        let newUser = { "username": username, "password": hashedPwd};

        data.users.push(newUser);
        res.status(201).json({"message": `User ${username} created!`});
    }catch(err){
        res.status(500).json({ "message": err.message });
    }
}

const login = async (req, res) =>{
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({'message': 'Username and password are required !'});

    let user = data.users.find( person => person.username === username);
    if(!user) return res.status(404).json({ 'message': 'User not found!' });

    let match = await bcrypt.compare(password, user.password);

    if(match){

        let accessToken = jwt.sign(
            {"username": user.username},
            process.env.ACCESS_TOKEN_SECRET,
            { "expiresIn": '1m' }
        );

        let refreshToken = jwt.sign(
            {"username": user.username},
            process.env.REFRESH_TOKEN_SECRET,
            { "expiresIn": '1d' }
        );

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        res.status(200).json({ accessToken });
    }else{
        res.sendStatus(401);
    }
}

module.exports = { register , login };