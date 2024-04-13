const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
import express from 'express';
import fetch from 'node-fetch'; 
const DB = require('./database.js');

const app = express();
// Serve up the applications static content
app.use(express.static('public'))

// Middleware to parse JSON bodies
app.use(express.json());
// Use the cookie parser middleware
app.use(cookieParser());
const port = 4000;

const historyStorage = {};
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = 'ea9f40b3e63d13331a1f878412420312';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {

            if(response.status === 404) {
                res.status(404).json({ error: 'Invalid city name provided.' });
            } else {    
                res.status(response.status).json({ error: data.message });
            }
            return;
        }
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data.' });
    }
});

apiRouter.post('/history/:username', (req, res) => {
    const username = req.params.username;
    const city = req.body.city;

    if (!historyStorage[username]) {
        historyStorage[username] = [];
    }

    historyStorage[username].push(city);
    res.status(201).send({ message: 'History saved.' });
});

apiRouter.get('/history/:username', (req, res) => {
    const username = req.params.username;
    const userHistory = historyStorage[username] || [];
    res.json(userHistory);
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});