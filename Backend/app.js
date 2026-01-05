<< << << < HEAD
const Server = require('./models/server')
const express = require('express');
const buildingRouter = require('./route/buildingRouter'); ===
===
=
const Server = require("./models/server");
const express = require("express"); >>>
>>>
>
e81974879852d26c2d2da0a661af0f6503015099
const server = new Server();
const feedbackRoutes = require("./routes/feedback"); // <-- your renamed file
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");

server.app.use(express.json());
server.app.use('/api/building', buildingRouter)

server.listen();
server.app.use("/api/feedback", feedbackRoutes);
server.app.use(globalErrorHandler);
server.listen();