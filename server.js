const express = require('express');

const projectRouter= require('./data/helpers/projectModel');
const actionRouter= require('./data/helpers/actionModel');

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
res.send(`
    <h2>Message API</h>
    <p>Welcome to my API</P>
  `);
})

module.exports = server;