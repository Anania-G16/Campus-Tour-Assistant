const Server = require('./models/server')
const express = require('express');
const buildingRouter = require('./route/buildingRouter');
const express = require("express");

const server = new Server();
const feedbackRoutes = require("./routes/feedback"); // <-- your renamed file
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");

server.app.use(express.json());
server.app.use('/api/building', buildingRouter)

server.app.use("/api/feedback", feedbackRoutes);
P
server.app.use(globalErrorHandler);
server.listen();