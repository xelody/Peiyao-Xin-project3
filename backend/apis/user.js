const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

const UserModel = require('../db/user/user.model');

const userDB = [];

router.get('/', function(request, response) {
    response.send(userDB);
})

router.post('/', async function(request, response) {
    const body = request.body;

    const newUserResponse = await UserModel.createUser(body)
   
    response.send("Created new user!");
})

router.post('/login', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (username === '') {
        return res.status(401).send("Missing username");
    }

    try {
        const getUserResponse = await UserModel.findUserByUsername(username)

        if (!getUserResponse) {
            return res.status(401).send("Please verify username");
        }

        if (!bcrypt.compareSync(password, getUserResponse.password)) {
            return res.status(403).send("Invalid password")
        }

        const token = jwt.sign(username, "PEIYAOS_PASSWORD")

        res.cookie("username", token);
        
        return res.send("User created successfully")
    
    } catch (e) {
        console.error('Error logging in user:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/register', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if(!username || !password) {
            return res.status(409).send("Missing username or password")
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const createUserResponse = await UserModel.createUser({username: username, password: hashedPassword});

        const token = jwt.sign(username, "PEIYAOS_PASSWORD")

        res.cookie("username", token);
        
        return res.send("User created successfully")
    
    } catch (e) {
        res.status(401).send("Error: username already exists");
    }
})

router.get('/isLoggedIn', async function(req, res) {

    const username = req.cookies.username;

    if(!username) {
        return res.send({auth: false, username: null})
    }
    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "PEIYAOS_PASSWORD")
    } catch(e) {
        return res.send({auth: false, username: null})
    }
    
    if(!decryptedUsername) {

        return res.send({auth: false, username: null})
    } else {
        return res.send({auth: true, username: decryptedUsername})
    }

})

router.post('/logOut', async function(req, res) {

    res.cookie('username', '', {
        maxAge: 0,
    })

    res.send(true);

});

router.get('/:username', async function(req, res) {
    const username = req.params.username;

    const userData = await 
    UserModel.findUserByUsername(username);

    return res.send(userData);
})

module.exports = router
