const express = require('express');
const helper = require('./backend/helper');
const pokemon = require('./backend/pokemon')
const users = require('./backend/user')
const app = express();
const mongoose = require('mongoose')

const mongoDBEndpoint = 'insert mondob string here'
mongoose.connect(mongoDBEndpoint,  { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pokemon/', pokemon);
app.use('/api/users/', users)


//"http://localhost:8000" + "/"
app.get("/", function(request, response) {
    // response.send('Hello web dev, again!!!');
    // response.send(helper.returnWords());
    response.send("I am preventing the next GET method from firign")
})

app.get("/", function(request, response) {
    // response.send('Hello web dev, again!!!');
    // response.send(helper.returnWords());
    response.send("This is the response from the GET method")
})

app.post("/", function(request, response) {
    response.send("This is a response from the POST methodd");
})

app.listen(8000, function() {
    console.log("Starting server now...")
})

// const http = require('http');

// const server = http.createServer(function (request, response) {

//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Hello web dev!');

// })

// // 127.0.0.1 === localhost
// server.listen(8000, "127.0.0.1", function() {
//     console.log("The server has started!")
// })