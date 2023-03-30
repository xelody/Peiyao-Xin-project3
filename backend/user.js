const express = require('express')
const router = express.Router();

const userDB = [];

router.get('/', function(request, response) {
    response.send(userDB);
})

router.post('/', function(request, response) {
    const newUser = request.body;

    if(!newUser.username) {
        response.status(401)
        return response.send("Missing username")
    }

    userDB.push(newUser);

    response.send("Created new user!");
})

module.exports = router