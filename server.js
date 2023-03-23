const express = require('express');
const helper = require('./helper');
const pokemon = require('./pokemon')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pokemon/', pokemon);


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

//     response.writeHead(404, { 'Content-Type': 'text/plain' });
//     response.end('Hello web dev!');

// })

// // 127.0.0.1 === localhost
// server.listen(8000, "127.0.0.1", function() {
//     console.log("The server has started!")
// })