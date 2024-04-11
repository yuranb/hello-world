const express = require('express');
const fetch = require('node-fetch'); 
const app = express();

app.use(express.static('public'))

// Middleware to parse JSON bodies
app.use(express.json());

const port = 4000;

const apiRouter = express.Router();

apiRouter.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = 'ea9f40b3e63d13331a1f878412420312';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {

});

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});