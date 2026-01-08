const Server = require('./models/server')
const express = require("express");
const cors = require('cors')
const server = new Server();
const buildingRouter = require('./route/buildingRouter');
const feedbackRouter = require('./route/feedback');

const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const userRouter = require('./route/auth');
server.app.use(express.json());
server.app.use(cors())
server.app.use("/api/user", userRouter)
server.app.use('/api/building', buildingRouter)

server.app.use("/api/feedback", feedbackRouter);

server.app.use(globalErrorHandler);
server.listen();