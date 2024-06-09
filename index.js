const fs = require('fs');
const http = require('http');

// Blocking, synchronous
fs.readFileSync('./txt/input.txt', 'utf-8');
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//fs.writeFileSync('./txt/input.txt', textOut);

// Non blocking, asynchronous
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
    // Do something
})

const server = http.createServer( (req, res) => {
    res.end('hello')
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requets on port 8000")
})