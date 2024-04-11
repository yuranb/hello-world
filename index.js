const express = require('express');
const fetch = require('node-fetch'); 
const app = express();

app.use(express.static('public'))

// Middleware to parse JSON bodies
app.use(express.json());

const port = 4000;

const apiRouter = express.Router();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});