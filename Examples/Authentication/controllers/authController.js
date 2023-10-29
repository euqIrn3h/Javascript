const data = {};
data.users = require('../models/users.json');

const bcrypt = require('bcrypt');

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

    let macth = await bcrypt.compare(password, user.password);

    if(macth){
        res.status(200).json({ 'message': 'Logged' });
    }else{
        res.sendStatus(401);
    }
}

module.exports = { register , login };