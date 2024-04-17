const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const axios  = require('axios')

const getWeather = async (ws) => {
  const apiKey = 'ea9f40b3e63d13331a1f878412420312';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Provo&appid=${apiKey}&units=imperial`;
  try {
      const response = await axios.get(url);
      const data = response.data
      if (response.status===200) {
        ws.send(JSON.stringify(data))
      }
  } catch (error) {
      console.error('Error fetching weather data:', error);
  }
}
function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });
  let connections = [];

  wss.on('connection', (ws) => {
    setInterval(function send() {
      getWeather(ws)
    }, 3600000);
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);
    ws.on('message', function message(data) {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });
    ws.on('close', () => {
      const pos = connections.findIndex((o, i) => o.id === connection.id);

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });
    ws.on('pong', () => {
      connection.alive = true;
    });
  });
  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };