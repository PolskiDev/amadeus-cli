const express = require('express')
let server = express()
const bodyParser = require('body-parser')
const path = require('path')
const hostname = 'localhost'
const port = 8000

// Carrega arquivos nao-HTML dentro da pasta public
server.use('/public', express.static(path.join(__dirname, 'public')))

// Carrega servidor Node.js
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});
server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});