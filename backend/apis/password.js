const express = require('express')
const router = express.Router();
const PasswordModel = require('../db/password/password.model');
const UserModel = require('../db/user/user.model');
const jwt = require('jsonwebtoken')


const passwordDb = [];

router.post('/', async function (request, response) {
    const { activeUsername, url, password } = request.body;
    const time = new Date();

    try {
        const existingEntry = await PasswordModel.findExistingEntry(url, activeUsername);

        if (existingEntry) {
            return response.status(400).json({ error: 'URL already exists for this username' });
        }

        const newEntryrResponse = await PasswordModel.createEntry(url, password, time, activeUsername);
        response.send("Created new entry!");
    } catch (error) {
        // Handle any errors that occur during the database operation
        console.error('Error creating new entry:', error);
        response.status(500).send('Internal Server Error');
    }

})

router.post('/share/:passwordId', async function (request, response) {
    const { passwordId } = request.params;
    const { accessUser } = request.body;
    console.log(accessUser);

    try {
        const targetUser = await UserModel.findUserByUsername(accessUser);
        if (!targetUser) {
            return response.status(400).json({ error: 'Invalid username!' });
        }

        const existingEntry = await PasswordModel.findPasswordById(passwordId);

        if (!existingEntry) {
            return response.status(400).json({ error: 'No password found!' });
        }

        const [existingEntries] = existingEntry;

        const { _id, urlAddress, password, time, username } = existingEntries;

        const alreadyShared = await PasswordModel
            .findAlreadySharedEntry(urlAddress, username, accessUser);

        if(alreadyShared) {
            return response.status(400).json({ error: 'Already Shared!' });
        }

        const newEntryrResponse = await PasswordModel.createShareEntry(
            urlAddress, password, time, username, accessUser);
        console.log(newEntryrResponse);
        response.send("Created new share entry!");
    } catch (error) {
        // Handle any errors that occur during the database operation
        console.error('Error creating new share entry:', error);
        response.status(500).send('Internal Server Error');
    }

})

router.get('/:username', async function (request, response) {
    const passwordList =
        await PasswordModel.findPasswordByUsername(request.params.username);

    const accessibleList =
        await PasswordModel.findPasswordByAccessUser(request.params.username);

    const combinedList = [...passwordList, ...accessibleList];

    response.send(combinedList);
});

router.get('/pending/:username', async function (request, response) {
    try {
        const pendingRequests =
            await PasswordModel.findPendingRequest(request.params.username);
        response.send(pendingRequests);
    } catch (error) {
        console.error('Error fetching pending requests:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:passwordId', async function (request, response) {
    const { passwordId } = request.params;
    const { password } = request.body;

    try {
        const updatedPassword = await PasswordModel.findByIdAndUpdate(passwordId, password);

        if (!updatedPassword) {
            return response.status(404).json({ error: 'Password not found' });
        }

        response.json(updatedPassword);
    } catch (error) {
        console.error('Error updating password:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/pending/:passwordId', async function (request, response) {
    const { passwordId } = request.params;

    try {
        const acceptRequest = await PasswordModel.findByIdAndAccept(passwordId);

        if (!acceptRequest) {
            return response.status(404).json({ error: 'Password not found' });
        }

        response.json(acceptRequest);
    } catch (error) {
        console.error('Error accept request:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});



router.delete('/:passwordId', async function (request, response) {
    const { passwordId } = request.params;

    try {
        const deletedPassword = await PasswordModel.deletePasswordById(passwordId);

        if (!deletedPassword) {
            return response.status(404).json({ error: 'Password not found' });
        }

        response.json({ message: 'Password deleted successfully' });
    } catch (error) {
        console.error('Error deleting password:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


// router.post('/', async function(request, response) {
//     const newPassword = request.body;

//     const username = request.cookies.username;

//     let decryptedUsername;
//     try {
//         decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD")
//     } catch(e) {
//         return response.status(404).send("Invalid request")
//     }


//     newPassword.username = decryptedUsername;

//     try {
//         const createPasswordResponse = await PasswordModel.createPassword(newPassword)
//         console.log(createPasswordResponse)
//         return response.send("Password Successfully Created: " + createPasswordResponse)
//     } catch (error) {
//         return response.status(500).send(error)
//     } 
// })

// router.get('/', function(request, response) {

//     const username = request.cookies.username;

//     let decryptedUsername;
//     try {
//         decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD")
//     } catch(e) {
//         return response.status(404).send("Invalid request")
//     }


//     PasswordModel.findPasswordByUsername(decryptedUsername)
//         .then(function(dbResponse) {
//             response.cookie("passwordCount", dbResponse.length + 1)
//             response.send(dbResponse)
//         })
//         .catch(function(error) {
//             response.status(500).send(error)
//         })

// })

// http://localhost:8000/api/pokemon/pikachu
/*

    request.params = {
        name: pikachu
    }

*/
// router.get('/:id', function(request, response) {
//     const passwordId = request.params.id;

//     PasswordModel.getPasswordById(passwordId)
//     .then(function(dbResponse) {
//         response.send(dbResponse)
//     })
//     .catch(function(error) {
//         response.status(500).send(error)
//     })


// })

//http://localhost:8000/api/pokemon/find?color=yellow&size=large
/*
    req.query = {
        color: 'yellow',
        size: 'large',
    }
*/
// router.get('/find', function(req, res) {
//     const color = req.query.color;

//     if(!color) {
//         return res.send(passwordDb);
//     }

//     const output = [];

//     for(let password of passwordDb) {
//         if(password.color === color) {
//             output.push(password)
//         }
//     }

//     res.send(output)

// })

// // http://localhost:8000 + /api/pokemon + /
// router.get('/pikachu', function(req, res) {
//     res.send("This is the pikachu")
// })

// router.get('/', function(req, res) {
//     res.send("This is the the base password route")
// })

// router.delete('/:passwordId', async function(req, response) {
//     const passwordId = req.params.passwordId;

//     const deleteResponse = await PasswordModel.deletePassword(passwordId)
//     return response.send("Successfully delete password!")
// })

// router.post('/', async function(request, response) {
//     const newEntry = request.body;
//     console.log(newEntry);

//     // Extract necessary data from request
//     const { url, password } = newEntry;
//     const username = request.cookies.username;
//     const time =  new Date();

//     // Save data to MongoDB
//     try {
//         const createEntryResponse = await PasswordModel.createEntry(url, password, time, username);
//         console.log(createEntryResponse);
//         return response.send("Entry Successfully Added: " + createEntryResponse);
//     } catch (error) {
//         return response.status(500).send(error);
//     }
// }); 
module.exports = router;