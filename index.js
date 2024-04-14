const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const app = express();
// Serve up the applications static content
app.use(express.static('public'))

// Middleware to parse JSON bodies
app.use(express.json());
// Use the cookie parser middleware
app.use(cookieParser());
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const historyStorage = {};
const apiRouter = express.Router();
app.use('/api', apiRouter);


//user register
apiRouter.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await DB.findUser(email);
    if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
    }
    const newUser = await DB.createUser(email, password);

    setAuthCookie(res, newUser.token); // Set the cookie for auth token
    res.status(201).json({ message: 'User created', userId: newUser._id });
});

//user login
apiRouter.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await DB.findUser(email);
    if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        res.status(401).json({ error: 'Invalid password' });
        return;
    }
    // Set the auth cookie
    setAuthCookie(res, user.token);

    res.json({ message: 'Login successful' });
});

apiRouter.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = 'ea9f40b3e63d13331a1f878412420312';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    const userToken = req.cookies['authCookieName']; 
    const updateKey = `${userToken}-${city.toLowerCase()}`; 

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

        clearInterval(userCityUpdates[updateKey]);
        userCityUpdates[updateKey] = setInterval(async () => {
            try {
                const updateResponse = await fetch(url);
                const updateData = await updateResponse.json();
                if (updateResponse.ok) {
                    broadcastWeatherUpdate(userToken, city, updateData);
                } else {
                    console.error('Failed to update weather:', updateData.message);
                }
            } catch (updateError) {
                console.error('Error fetching weather for interval update:', updateError);
            }
        }, 600000); 

    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data.' });
    }
});

apiRouter.delete('/logout', (_req, res) => {
    res.clearCookie(authCookieName);

    // Finds and clears all timers with this user
    Object.keys(userCityUpdates).forEach(key => {
        if (key.startsWith(userToken + '-')) { 
            clearInterval(userCityUpdates[key]);
            delete userCityUpdates[key]; 
        }
    });

    res.status(204).end();
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

// Helper function to set auth cookie
function setAuthCookie(res, token) {
    res.cookie('authCookieName', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
          });
}

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService);