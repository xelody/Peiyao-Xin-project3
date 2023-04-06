const express = require('express')
const router = express.Router();

const UserModel = require('./db/user/user.model');

const userDB = [];

router.get('/', function(request, response) {
    response.send(userDB);
})

router.post('/', async function(request, response) {
    const body = request.body;

    const newUserResponse = await UserModel.createUser(body)
   
    response.send("Created new user!");
})

router.get('/:username', async function(req, res) {
    const username = req.params.username;

    const userData = await 
    UserModel.findUserByUsername(username);

    return res.send(userData);
})

module.exports = router