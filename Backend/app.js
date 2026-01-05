const Server = require('./models/server')
const express = require('express');
const buildingRouter = require('./route/buildingRouter');
const server = new Server();

server.app.use(express.json());
server.app.use('/api/building', buildingRouter)

server.listen();