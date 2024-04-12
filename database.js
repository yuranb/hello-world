const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db =  client.db('WeatherDB');
const userCollection = db.collection('users');
const queryHistoryCollection = db.collection('queryHistory');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(newUser);
    return newUser;
    }

function findUser(email) {
    return userCollection.findOne({ email });
}

async function validateUser(email, password) {
    const user = await findUser(email);
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null; 
}

async function saveQuery(email, query, results) {
    const newQuery = {
        email: email,
        query: query,
        results: results,
    };
    await queryHistoryCollection.insertOne(newQuery);
}

async function getQueryHistory(email) {
    return await queryHistoryCollection.find({ email }).toArray();
}

module.exports = {
    createUser,
    findUser,
    validateUser,
    saveQuery,
    getQueryHistory,
};