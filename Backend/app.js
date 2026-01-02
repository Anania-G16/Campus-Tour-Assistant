const Server = require('./models/server')
const express = require('express')
const server = new Server();

server.app.use(express.json());
server.listen();