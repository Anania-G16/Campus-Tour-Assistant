const Server = require("./models/server");
const express = require("express");
const server = new Server();
const feedbackRoutes = require("./routes/feedback"); // <-- your renamed file
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");

server.app.use(express.json());

server.app.use("/api/feedback", feedbackRoutes);
server.app.use(globalErrorHandler);
server.listen();
