const express = require('express')
const router = express.Router();
const PasswordModel = require('../db/password/password.model');
const jwt = require('jsonwebtoken')


const passwordDb = [
    {
        name: "pikachu",
        color: "yellow",
        health: 100,
    },
    {
        name: "charizard",
        color: "red",
        health: 200,
    },
    {
        name: "squirtle",
        color: "yellow",
        health: 150,
    },
]

// request.body should include name, color and health
// /api/password/findColor/red
router.get('/findColor/:color', async function(request, response) {
    const color = request.params.color;

    const matchingPassword = await PasswordModel.findPasswordByColor(color)
    response.send(matchingPassword);
});

// POST localhost:8000/api/password/
router.post('/', async function(request, response) {
    const newPassword = request.body;

    const username = request.cookies.username;

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD")
    } catch(e) {
        return response.status(404).send("Invalid request")
    }
    

    newPassword.username = decryptedUsername;

    // if(!newPokemon.color || !newPokemon.name || !newPokemon.health) {
    //     return response.status(422).send("Missing argument to create new pokemon");
    // }

    try {
        const createPasswordResponse = await PasswordModel.createPassword(newPassword)
        console.log(createPasswordResponse)
        return response.send("Password Successfully Created: " + createPasswordResponse)
    } catch (error) {
        return response.status(500).send(error)
    } 

    //    pokemonDb.push(newPokemon);

    //response.status(200).send("Pokemon " + newPokemon.name + " was created successfully");
})

router.get('/', function(request, response) {

    const username = request.cookies.username;

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD")
    } catch(e) {
        return response.status(404).send("Invalid request")
    }
    

    PasswordModel.findPasswordByUsername(decryptedUsername)
        .then(function(dbResponse) {
            response.cookie("passwordCount", dbResponse.length + 1)
            response.send(dbResponse)
        })
        .catch(function(error) {
            response.status(500).send(error)
        })

})

// http://localhost:8000/api/pokemon/pikachu
/*

    request.params = {
        name: pikachu
    }

*/
router.get('/:id', function(request, response) {
    const passwordId = request.params.id;

    PasswordModel.getPasswordById(passwordId)
    .then(function(dbResponse) {
        response.send(dbResponse)
    })
    .catch(function(error) {
        response.status(500).send(error)
    })

    // for(let i = 0; i < pokemonDb.length; i++) {
    //     const pokemon = pokemonDb[i];
    //     if (pokemon.name === pokemonName) {
    //         return response.send(pokemon);
    //     }
    // }

    // response.status(404).send("No pokemon with name " + pokemonName + " found.")

})

//http://localhost:8000/api/pokemon/find?color=yellow&size=large
/*
    req.query = {
        color: 'yellow',
        size: 'large',
    }
*/
router.get('/find', function(req, res) {
    const color = req.query.color;

    if(!color) {
        return res.send(passwordDb);
    }

    const output = [];

    for(let password of passwordDb) {
        if(password.color === color) {
            output.push(password)
        }
    }

    res.send(output)

})

// http://localhost:8000 + /api/pokemon + /
router.get('/pikachu', function(req, res) {
    res.send("This is the pikachu")
})

router.get('/', function(req, res) {
    res.send("This is the the base password route")
})

router.delete('/:passwordId', async function(req, response) {
    const passwordId = req.params.passwordId;

    const deleteResponse = await PasswordModel.deletePassword(passwordId)
    return response.send("Successfully delete password!")
})

router.post('/', function(req, res) {
    res.send("This is how you'll create new password")
})

module.exports = router;