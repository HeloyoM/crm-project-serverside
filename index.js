const express = require('express');
const path = require('path');

const employeesController = require('./controllers/employeesController');
const errorHandler = require('./error/errorHandler');

const cors = require('cors');
const server = express();

const port = process.env.PORT || 8080;
server.use(express.static('./public'));
server.use(cors({ origin: ["*", "http://localhost:8080", "http://localhost:3000"] }));

server.use(express.json());

server.use("/employees", employeesController);

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});
server.use(errorHandler);
server.listen(port, () => console.log("listening on ", port));