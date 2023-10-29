const data = {};
data.users = require('../models/users.json');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) return res.sendStatus(401);

    let token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err){
                refreshToken(req, res, next);
            }
            next();
        }
    );
};

const refreshToken = (req, res, next) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(401);

    let refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403);

            let user = data.users.find( person => person.username === decoded.username);
            if(!user) return res.sendStatus(403);
            
            let accessToken = jwt.sign(
                {"username": user.username},
                process.env.ACCESS_TOKEN_SECRET,
                { "expiresIn": '1m' }
            );

            res.status(200).json({ accessToken });
            next();
        }
    );
};

module.exports = verifyJWT;