const express = require('express');

const projectsRouter = require("./projects/projectsRouter");

const actionsRouter = require("./actions/actionsRouter");

const server = express();

server.use(express.json()); 

server.use("/api/projects", logger, projectsRouter);

server.use("/api/actions", logger, actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Projects and Actions</h2>`);
});

function logger(req, res, next) {
    const today = new Date().toISOString(); // YYYY-MM-DD
      console.log(`[${today}] ${req.method} to ${req.originalUrl}`);
    next();
  }
  
  module.exports = server;